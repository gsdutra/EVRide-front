import { useEffect, useState, ChangeEvent, use } from 'react';
import useApi from '@/hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
import UserNotLogged from '@/components/UserNotLogged';

export default function Anunciar() {
	const [userLogged, setUserLogged] = useState(false);

	const [vehicleModel, setVehicleModel] = useState<string>('');
	const [vehicleBrand, setVehicleBrand] = useState<string>('');

	const [modelList, setModelList] = useState<any[]>([]);
	const [brandList, setBrandList] = useState<any[]>([]);

	const [vehicleCategory, setVehicleCategory] = useState<string>('');
	const [vehicleYear, setVehicleYear] = useState<number | undefined>(undefined);
	const [vehiclePrice, setVehiclePrice] = useState<number | undefined>(undefined);
	const [vehicleMileage, setVehicleMileage] = useState<number | undefined>(undefined);
	const [plateEnding, setPlateEnding] = useState<number>();
	const [acceptsTrade, setAcceptsTrade] = useState<number>(1);
	const [fuelType, setFuelType] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const [image, setImage] = useState<string>('');

	useEffect(() => {
		const token = localStorage.getItem("token") || "";
		const prom = useApi.get('/user', token)
		.then((e) => setUserLogged(true))
		.catch((e) => setUserLogged(false))

		const prom2 = useApi.get('/listing/brands')
		.then((e) => setBrandList(e.data))
		.catch((e) => console.log(e))
	}, [])

	useEffect(() => {
		if (vehicleBrand) {
			const brandId = brandList.find((brand) => brand.name === vehicleBrand)?.id;
			if (!brandId) return;
			const prom = useApi.get(`/listing/models/${brandId}`)
				.then((e) => setModelList(e.data))
				.catch((e) => console.log(e))
		}
	}, [vehicleBrand])

	const handleSubmit = async (e: any) => {
		const token = localStorage.getItem("token") || "";
		e.preventDefault();

		let brandId: number = brandList.find((brand) => brand.name === vehicleBrand);
		let modelId: number = modelList.find((model) => model.name === vehicleModel);

		try {
			if (brandId === undefined) {
				const createBrand = await useApi.post('/listing/brands', { brand: vehicleBrand }, token);
				brandId = createBrand.data.id as number;

				const createModel = await useApi.post('/listing/models', { model: vehicleModel, brandId: brandId }, token)
				modelId = createModel.data.id;
			} else if (modelId === undefined) {
				const createModel = await useApi.post('/listing/models', { model: vehicleModel, brandId: brandId }, token)
				modelId = createModel.data.id;
			}
		} catch (e) {
			console.error(e)
		}

		const data: object = {
			brandId: brandId,
			modelId: modelId,
			year: vehicleYear,
			price: vehiclePrice,
			mileage: vehicleMileage,
			plateEnding: plateEnding,
			acceptsTrade: Boolean(acceptsTrade),
			fuel: fuelType,
			description: description,
			image: image
		}

	}

	const handleMileageChange = (e: ChangeEvent<HTMLInputElement>) => {
	}

	return (<>
		{userLogged?
		<div className="mt-[50px] flex flex-col justify-center items-center text-xl">
			<p>Anunciar veículo</p>
			<form onSubmit={handleSubmit} className="mt-[50px] flex flex-col justify-center items-center">
			<select value={vehicleCategory} onChange={e => setVehicleCategory(e.target.value)}
				required
				className="mb-3">
				<option value="null">Selecione o tipo do veículo</option>
				<option value="CAR">Carro</option>
				<option value="MOTORCYCLE">Moto</option>
			</select>
			<input
				required
				className="mb-3"
				placeholder='Marca do veículo'
				type="text"
				id="brand"
				list="brands"
				value={vehicleBrand}
				onChange={e => setVehicleBrand(e.target.value)}
			/>
			<datalist id="brands">
				{brandList.map((brand, i) => (
					<option value={brand.name} key={i} />
				))}
			</datalist>
			<input
				required
				className="mb-3"
				placeholder='Modelo do veículo'
				type="text"
				id="model"
				list="models"
				value={vehicleModel}
				onChange={e => setVehicleModel(e.target.value)}
				disabled={vehicleBrand === ''}
			/>
			<datalist id="models">
				{modelList.map((model, i) => (
					<option value={model.name} key={i} />
				))}
			</datalist>
			<input
				required
				className="mb-3"
				placeholder='Ano'
				type="number"
				id="year"
				value={vehicleYear}
				onChange={e => setVehicleYear(e.target.value as unknown as number)}
			/>
			<input
				required
				className={`mb-3 ${!vehiclePrice? '':'pl-11'} box-border`}
				placeholder='Preço'
				type="number"
				id="price"
				value={vehiclePrice}
				onChange={e=>setVehiclePrice(e.target.value as unknown as number)}
			/>
			{!vehiclePrice? <></> :
			<div className="input-bar">
				<div className="input-value-left">
					,00
				</div>
				<div className="input-value-right">
					R$
				</div>
			</div>
			}
			<input
				required
				className="mb-3"
				placeholder='Quilometragem'
				type="number"
				id="mileage"
				value={vehicleMileage}
				onChange={e => setVehicleMileage(e.target.value as unknown as number)}
			/>
			{!vehicleMileage? <></> :
			<div className="input-bar">
				<div className="input-value-left">
					km
				</div>
			</div>
			}

			<select value={plateEnding} onChange={e => setPlateEnding(e.target.value as unknown as number)}
				required
				className="mb-3">
				<option value="null">Final da placa</option>
				{Array.from(Array(10), (_, i) => (
				<option value={i} key={i}>{i}</option>
				))}
			</select>

			<select value={acceptsTrade} onChange={e => setAcceptsTrade(e.target.value as unknown as number)}
				required
				className="mb-3">
				<option value="null">Selecione se aceita troca</option>
				<option value={1}>Aceita troca</option>
				<option value={0}>Não aceita troca</option>
			</select>

			<select value={fuelType} onChange={e => setFuelType(e.target.value)}
				required
				className="mb-3">
				<option value="null">Selecione o combustível</option>
				<option value="ELECTRIC">100% elétrico</option>
				<option value="HYBRID">Híbrido</option>
			</select>

			<textarea required value={description} onChange={e => setDescription(e.target.value)}
			className="mb-3 w-[90%] p-2" placeholder="Descrição do veículo" />

			<input
				required
				className="mb-3"
				placeholder='Link da imagem principal'
				type="url"
				id="photo"
				value={image}
				onChange={e => setImage(e.target.value)}
			/>
			
			<button className="button bt bg-blue mt-2 w-[341px]" type="submit">ENVIAR ANÚNCIO</button>
		</form>
		<div className="h-16"/>
		</div>
		:
		<UserNotLogged/>
		}
	</>)
}
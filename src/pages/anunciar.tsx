import { useEffect, useState, ChangeEvent, use } from 'react';
import useApi from '@/hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import UserNotLogged from '@/components/UserNotLogged';
import axios from 'axios';

export default function Anunciar() {
	const [userLogged, setUserLogged] = useState(false);

	const [vehicleModel, setVehicleModel] = useState<string>('');
	const [vehicleBrand, setVehicleBrand] = useState<string>('');

	const [stateList, setStateList] = useState<string[]>([]);
	const [cityList, setCityList] = useState<string[]>([]);

	const [brandList, setBrandList] = useState<any[]>([]);
	const [modelList, setModelList] = useState<any[]>([]);

	const [vehicleCategory, setVehicleCategory] = useState<string>('');
	const [vehicleYear, setVehicleYear] = useState<number | undefined>(undefined);
	const [vehiclePrice, setVehiclePrice] = useState<number | undefined>(undefined);
	const [vehicleMileage, setVehicleMileage] = useState<number | undefined>(undefined);
	const [plateEnding, setPlateEnding] = useState<number>();
	const [acceptsTrade, setAcceptsTrade] = useState<number>();
	const [fuelType, setFuelType] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const [state, setState] = useState<string>('');
	const [city, setCity] = useState<string>('');

	const [image, setImage] = useState<string>('');

	useEffect(() => {
		const token = localStorage.getItem("token") || "";
		const checkUser = useApi.get('/user', token)
		.then((e) => setUserLogged(true))
		.catch((e) => setUserLogged(false))

		const getBrands = useApi.get('/listing/brands')
		.then((e) => setBrandList(e.data))
		.catch((e) => console.log(e))

		let statesArray: string[] = [];
		const getStates = axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
		.then((e) => {
			e.data.map((state: any) => statesArray.push(state.sigla))
			statesArray.sort();
			setStateList(statesArray);
		})
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

	useEffect(() => {
		let cityArray: string[] = [];
		const getCities = axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
			.then((e) => {
				e.data.map((city: any) => cityArray.push(city.nome))
				cityArray.sort();
				setCityList(cityArray);
			})
			.catch((e) => console.log(e))
	}, [state])

	const handleSubmit = async (e: any) => {
		const token = localStorage.getItem("token") || "";
		e.preventDefault();

		let brandId = brandList.find((brand) => brand.name === vehicleBrand);
		let modelId = modelList.find((model) => model.name === vehicleModel);
		if (brandId) brandId = brandId.id;
		if (modelId) modelId = modelId.id;

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
			category: vehicleCategory,
			brandId: brandId,
			modelId: modelId,
			year: Number(vehicleYear),
			price: Number(vehiclePrice),
			mileage: Number(vehicleMileage),
			plateEnding: Number(plateEnding),
			acceptsTrade: Boolean(acceptsTrade),
			fuel: fuelType,
			description: description,
			imagesArray: [image],
			state: state,
			city: city
		}

		const createListing = await useApi.post('/listing', data, token)
			.then((e) => {
				toast.success('Anúncio criado com sucesso!');
				setTimeout(() => {
					window.location.href = '/anuncios';
				}, 2000);
			})
			.catch((e) => {
				toast.error('Erro ao criar anúncio!')
				console.log(e)
			})

	}

	const handleMileageChange = (e: ChangeEvent<HTMLInputElement>) => {
	}

	return (<>
		<ToastContainer/>
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

			<a>Onde o veículo está localizado?</a>
			<select value={state} onChange={e => setState(e.target.value)}
				required
				className="mb-3">
				<option value="null">Selecione o estado</option>
				{stateList.map((state, i) => (
					<option value={state} key={i}>{state}</option>
				))}
			</select>
			<select value={city} onChange={e => setCity(e.target.value)}
				required
				disabled={state === 'null'}
				className="mb-3">
				<option value="null">Selecione a cidade</option>
				{cityList.map((city, i) => (
					<option value={city} key={i}>{city}</option>
				))}
			</select>
			
			<button className="button bt bg-blue mt-2 w-[341px]" type="submit">ENVIAR ANÚNCIO</button>
		</form>
		<div className="h-16"/>
		</div>
		:
		<UserNotLogged/>
		}
	</>)
}
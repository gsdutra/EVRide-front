import { useState, FormEvent, ChangeEvent } from 'react';
import useApi from '../hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function Signup() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [type, setType] = useState('personal');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (password !== passwordRepeat) {
			toast('As senhas não coincidem', { type: 'error' })
			return;
		}
		if (password.length < 5) {
			toast('A senha deve ter ao menos 5 caracteres', { type: 'error' })
			return;
		}
		const prom = useApi.post('/auth/signup', { email, name, type, password })
			.then(r => {
				toast('Registro efetuado com sucesso!', { type: 'success' })
				setTimeout(()=>router.push('/signin'), 1000)
			})
			.catch(e => toast('Algo deu errado! Por favor, revise seus dados.', {type: 'error'}))

	};

	return (<div className="mt-[50px] flex flex-col justify-center items-center">
		<a className="text-xl">Insira seus dados para criar sua conta:</a>
		<ToastContainer />

		<form onSubmit={handleSubmit} className="mt-[50px] flex flex-col justify-center items-center">
			<input
				required
				className="mb-3"
				placeholder='email'
				type="email"
				id="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<input
				required
				className="mb-3"
				placeholder='nome de usuário'
				type="text"
				id="name"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<input
				required
				className="mb-3"
				placeholder='senha'
				type="password"
				id="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<input
				required
				className="mb-3"
				placeholder='repetir senha'
				type="password"
				id="passwordRepeat"
				value={passwordRepeat}
				onChange={e => setPasswordRepeat(e.target.value)}
			/>

			<select value={type} onChange={e => setType(e.target.value)}
				className="mb-5">
				<option value="personal">Pessoa física</option>
				<option value="store">Loja</option>
			</select>

			<button className="button bt bg-blue w-[341px]" type="submit">REGISTRAR</button>
		</form>

		<button className="button bt bg-gray w-[341px]" >Já tem conta? Faça login</button>

	</div>)
}
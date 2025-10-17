import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form>
      <label id='errortext'>txt</label>
      <br/>
      <label htmlFor="email">Email:</label>
      <br/>
      <input className='bg-primary-light text-primary-dark' id="email" name="email" type="email" required />
      <br/>
      <label htmlFor="password">Password:</label>
      <br/>
      <input className='bg-primary-light text-primary-dark' id="password" name="password" type="password" required />
      <br/>
      <button formAction={login}>Log in</button>
      <br/>
      <button formAction={signup}>Sign up</button>
    </form>
  )
} 
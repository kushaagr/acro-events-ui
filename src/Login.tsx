import { useState } from 'react';
import { 
  Container,
  Space,
  TextInput, 
  PasswordInput,
  Button,
  Alert
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function Login({ setToken, setTab }) {

  const [alertOpen, setAlertOpen] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  
    validate: {
      username: (value) => (value === '' ? "Username cannot be emtpy" : null), 
      // password: (value) => (value === '' ? "Password cannot be empty" : null),
      password: (value) => value === '',
    },
    
  });

  async function loginUser(credentials) {
    const fd = new FormData()
    fd.append('username', credentials.username);
    fd.append('password', credentials.password)

    console.log("Trying log in...")

    return fetch('https://acro-events.onrender.com/api/auth/login', {
      method: 'POST',
       // headers: {
       //   'Content-Type': 'application/json'
       // },
       // body: JSON.stringify(credentials)
      body: fd,
    }).then(data => data.json())
    // })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log('Submitting with values', username, password);
    // console.log(form.getInputProps())
    // console.log(form.getInputProps('name'))
    // console.log(form.values)
    const {username, password} = form.values
    form.validate()
    console.log(username, password, form.isValid())

    if (!form.isValid()) {
      console.log("invalid credentials")
      return
    }
    
    setIsLogging(true);
    const res = await loginUser({
      username,
      password
    });
    setIsLogging(false);
    setAlertOpen(!res.success);
    if (res.success) {
      setTab('timeline');
    }

    console.log('Done with log in process')
    console.log("Received token is ", res.token);

    setToken(res);
  }
  
  return (
    <>
      { alertOpen && (
        <Alert title="Invalid Credentials!" color="yellow">
          Username or password is incorrect. Please try again
        </Alert>
      )}

      <Container py="xl" size="xs">
        <form onSubmit={handleSubmit}> 
          <TextInput
            placeholder="Enter your username"
            label="Username"
            withAsterisk
            {...form.getInputProps('username')}
          />
          <Space h='md' />
          <PasswordInput 
            placeholder="Password"
            label="Password"
            withAsterisk
            {...form.getInputProps('password')}
          />
          <Space h='md' />
          <Button type="submit" variant="outline" uppercase 
            onClick={handleSubmit}
            disabled={isLogging}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  )
}

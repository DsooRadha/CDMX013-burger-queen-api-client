import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Welcome from '../noauth/Login'
import { BrowserRouter } from 'react-router-dom'
// import axios from "axios";
jest.mock('axios');

// const response={
//     email:'algo.com',
//     password:'lkdjla'
// }
// axios.get = jest.fn(() => { Promise.resolve({response}) });
// const spy=jest.spyOn(axios, 'get') 


describe('Welcome component', () => {
    it('show', () => {

        render(<Welcome />, { wrapper: BrowserRouter })
        const section = screen.getByTestId('welcome');
        expect(section).toBeInTheDocument();
    })

});

// describe('Inputs Welcome', () => {
// test('cuando la informacion ingresada en los inputs es invalida', () => {
//     render(<Welcome />, { wrapper: BrowserRouter })
    
// })
// });
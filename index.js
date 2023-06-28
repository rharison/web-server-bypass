import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';

const baseExternalUrl = 'https://api.truckhelp.ideiacwb.com.br'
const axiosInstance = axios.create({
  baseURL: baseExternalUrl,
  headers: {
    "permissao": 'Ayz118yOp0ks',
  },
});

const baseApi = '/api/bypass'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().none());
app.use(cors());


app.post(`${baseApi}/estabelecimentos`,  (req, res) => {
  const { body } = req
  const form = new FormData();
  Object.keys(body).forEach(key => {
    form.append(key, body[key]);
  });

  axiosInstance.post('/estabelecimentos', form, {
    headers: form.getHeaders(),
  }).then(response => {
    res.send(response.data);
  }).catch(error => {
    console.log(error);
  });
});

app.get(`${baseApi}/estabelecimentos/:id`,  (req, res) => {
  const { id } = req.params

  axiosInstance.get(`/estabelecimentos/${id}`).then(response => {
    res.send(response.data);
  }
  ).catch(error => {
    console.log(error);
  });
});

app.listen(8000, () => {
  console.log('Server is running on port 8000')
})
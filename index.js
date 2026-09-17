const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Datos en memoria
let productos = [
  { id: 1, nombre: 'Teclado mecánico', precio: 180000, stock: 12 },
  { id: 2, nombre: 'Mouse inalámbrico', precio: 65000, stock: 30 },
  { id: 3, nombre: 'Monitor 24 pulgadas', precio: 720000, stock: 5 }
];
let siguienteId = 4;

// 1. Listar todos los productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// 2. Obtener un producto por id
app.get('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === Number(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

// 3. Crear un producto
app.post('/productos', (req, res) => {
  const { nombre, precio, stock } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'nombre y precio son obligatorios' });
  }
  const nuevo = { id: siguienteId++, nombre, precio, stock: stock ?? 0 };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// 4. Actualizar un producto
app.put('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === Number(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  const { nombre, precio, stock } = req.body;
  if (nombre !== undefined) producto.nombre = nombre;
  if (precio !== undefined) producto.precio = precio;
  if (stock !== undefined) producto.stock = stock;
  res.json(producto);
});

// 5. Eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const indice = productos.findIndex(p => p.id === Number(req.params.id));
  if (indice === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  const eliminado = productos.splice(indice, 1)[0];
  res.json({ mensaje: 'Producto eliminado', producto: eliminado });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API de productos escuchando en el puerto ${PORT}`);
});
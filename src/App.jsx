import Guitar from "./components/Guitar"
import Header from "./components/Header"
import {useState, useEffect} from 'react'
import { db } from "./data/db"


function App() {

  const initialCart = () =>{
    const localStorageCart= localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data ] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const minItems = 1
  const maxItems = 5


  // Guarda en local 
  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])



  function addToCart(item){
    const itemExits = cart.findIndex(guitar => guitar.id === item.id) //Si no existe agrega -1 y si ya está agregado agrega 0 o más
    if(itemExits >=0){
      if(cart[itemExits].quantity >= maxItems ) return
      const updatedCart =[...cart] // copia de state
      updatedCart[itemExits].quantity++  //incremetacion de items
      setCart(updatedCart) //seteamos 
    }else{
      item.quantity=1
      setCart([...cart, item])
    }
    }

    function removeFromCart(id){
      setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }


  
    // Funcion para decrementar 

    function decreaseQuantity (id){
      const updatedCart = cart.map( item =>{
        if(item.id === id && item.quantity > minItems){
          return{
            ...item,
            quantity: item.quantity - 1
          }
        }
        return item
      })
      setCart(updatedCart)
    }

    // Funcion para incrementar 

    function increaseQuantity (id){
      const updatedCart = cart.map( item =>{
        if(item.id === id && item.quantity < maxItems){
          return{
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      setCart(updatedCart)
    }

    //Limpiar Carrito

    function clearCart(){
      setCart([])
    }




  
  return (
    <> 
    <Header
    cart={cart}
    removeFromCart={removeFromCart}
    decreaseQuantity={decreaseQuantity}
    increaseQuantity={increaseQuantity}
    clearCart={clearCart}
    />


    <main className="container-xl mt-5">
        <h2 className="text-center">Colección Mora's</h2>

        <div className="row mt-5">
          {data.map((guitar) =>(
            <Guitar
            key={guitar.id}
            guitar={guitar} //se crea el props
            setCart={setCart}
            addToCart={addToCart}

            />
        ))}
        
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>


    </>
  )

}
export default App

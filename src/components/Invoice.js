import React, { useEffect, useState } from 'react'
import { SpinnerRoundFilled } from 'spinners-react';
import { TiDelete } from 'react-icons/ti'
import "../style/style.css"

const Invoice = () => {
    const [dec, setDec] = useState("")
    const [qut, setQut] = useState("")
    const [price, setPrice] = useState("")
    const [data, setData] = useState([])

    let QutPrice = qut
    let PricePut = price
    
    let Anw = QutPrice * PricePut
    let AllInvoice = JSON.parse(localStorage.getItem("InvoiceData")) || [];    
    // console.log(data)

    let Id = Date.now()

    const getData = () => {
        let AllInvoice = JSON.parse(localStorage.getItem("InvoiceData")) || []
        setData(AllInvoice)
    }
    
    const Addinvoice = ()=>{
        let AllInvoicesData = {dec, qut, price, Anw, Id}
        AllInvoice.push(AllInvoicesData)
        localStorage.setItem("InvoiceData", JSON.stringify(AllInvoice))
        window.location.reload()
    }

    const deleteItem = (Id) => {
        const removeItem = data.filter((el) => el.Id !== Id);
        localStorage.setItem("InvoiceData", JSON.stringify(removeItem))
        console.log(removeItem)
        setData(removeItem);
      };
   

    useEffect(() => {
        getData();
    }, []);

  return (
    <div className='Main'>
        <div className='Head'><h2>Invoice</h2></div>
        <div className='InputDiv'>
            <textarea placeholder='Enter Your Decrtion'
            onChange={(e) => setDec(e.target.value)}
            />
            <input type= "text" placeholder='Enter Your Qut'
            className='InputP'
            onChange={(e) => setQut(e.target.value)}
            />
            <div className='Amount'>
            <input type= "text" placeholder='Enter Your  Amount'
            className='AmtInput'
             onChange={(e) => setPrice(e.target.value)}
            />
            <span>&#8358;</span>
            </div>
            <div className='Amount'>
            <input type= "text" placeholder='Enter Your  Amount'
            className='AmtInput'value={Anw ? Anw : '0'}
            readOnly
            />
            <span>&#8358;</span>
            </div>
            <button onClick={()=>Addinvoice()}>Add Voice</button>
        </div>

        <div className='InvoiceOutput'>
            {
                data.length ? <div className='InvoceContainer'>
                    <div className='InvoiceItem'>
                     {
                        data.map((props)=>(
                            <div className='Item' key={props.Id}>
                            <div className='ItemeS'>
                                <div className='Dec'>{props.dec}</div>
                                <div className='Qut'>{props.qut}</div>
                                <div className='Unt'>{props.price}</div>
                                <div className='Amt'>{props.Anw}</div>
                            </div>
                            <TiDelete className='Del' onClick={()=> deleteItem(props.Id)}/>
                        </div>
                        ))
                     }
                    </div>
                </div>
                : <div className='Spinner'> <SpinnerRoundFilled size="15%" color='blue'/> </div>
            }
        </div>
    </div>
  )
}

export default Invoice
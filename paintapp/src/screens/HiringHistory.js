import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
// import data from '../data';
import { Fade } from 'react-slideshow-image';
import axios from 'axios';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaFilePdf} from 'react-icons/fa';


function HiringHistory(props){

  const [products, setProduct] = useState([]);
  const [rent, setRent] = useState([]);

  useEffect(()=>{
    const fetchData = async() =>{
      const {data} = await axios.get("/Hiringhistory");
      setProduct(data);
    }
    fetchData();
    return ()=>{

    };
  },[]);

  useEffect(()=>{
    const fetchData = async() =>{
      const {data} = await axios.get("/rentalcount");
      setRent(data);
    }
    fetchData();
    return ()=>{

    };
  },[]);

const ref = useRef();
const options = {
  orientation: 'landscape'
};   
const handlePrint = useReactToPrint({
  content: () => ref.current,
});
      
      return <div>

          <h2>Paintings Rental History</h2>
          
        <ul className="bill">
                {
                    products.map(product=>
                    <li>
                   <div className="billno">BiillNo: {product.BillNo}</div>
                   <div className="paint">Painting ID: {product.paintingid}</div>
                   <div className="paint">Rent Date: {product.rentdate}</div>
                   <div className="paint">Return Date:{product.returndate}</div>
                   <div className="paint">Painting Name:{product.paintingname}</div>
                   <div className="paint">Returned:{product.Returned}</div>
                   
                   <img src={product.image} alt="painting1"/>
                    
                </li>
                        )
                }
            </ul>
            {rent.length==0?    
            <h2>No Hiring History</h2>
            :
            <div>
            <div className="BillPDF" ref={ref}>
            <h3>Paintorzo</h3><br/>
            <h4>Your Hiring History</h4>
            <h5>List of painting rented from our painting gallery and the count of times hired</h5>
            <table>
              <tr>
                <th>PaintingName</th>
                <th>Number of Times Hired</th>
                
              </tr>
              {
                 rent.map(rents=>
                  <tr>
                    <td>{rents.paintingname}</td>
                   <td>{rents.paintingcount}</td>
                  </tr>
                 )
              }
            </table>
            <br/>
            <h5>From Paintorzo team....</h5><br/>
            <h5>Contact us for futher queries</h5>
            <h5><i>emailid: masthanmasthi037@gmail.com</i></h5>
            </div>
            <br/>
            
            <button id="pdfgen" onClick={handlePrint}><FaFilePdf/>Generate pdf</button>
            </div>
            }
</div>

}

export default HiringHistory;
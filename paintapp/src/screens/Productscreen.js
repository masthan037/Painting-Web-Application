import React, { useState, useEffect }  from 'react';
// import data from '../data';
import {Link} from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';
import Axios from 'axios';
import App from '../App.js';


function Productscreen(props){
    const [week,setweek] = useState(1);
    const [products, setProduct] = useState([]);
    const [hired, setHired] = useState("");
    const [Rdate, setdate] = useState("");
    const [RHdate, setHdate] = useState("");
    const [pname, setPName] = useState("");
    const [image, setPimage] = useState("");  
    
    let date_ob = new Date();
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let Ndate;
    let Hdate;
    let Rmonth;
    let Ryear;
    let Rdates;

  useEffect(()=>{
    const fetchData = async() =>{
      const {data} = await Axios.get("/paintings/"+props.match.params.id);
      console.log(data[0]);
      setProduct(data);
      setHired(data[0].hired);
      setPName(data[0].paintingname);
      setPimage(data[0].image);
    }
    fetchData();
    return ()=>{

    };
  },[]);

//   const handleAddToCart = () =>{
        
//       props.history.push("/cart/"+ props.match.params.id + "?week="+week + "?date="+Rdate);
  
// }

    // const product = data.product.find(x => x._id === props.match.params.id);

    const rent = () =>{
        Ndate = Rdate.split("-");
        Hdate = RHdate.split("-");
        Ryear=Ndate[0];
        Rmonth = Ndate[1];
        Rdates = Ndate[2];

        if((Hdate[0]>=year && Hdate[1]>=month && Hdate[2]>date)&&(Ndate[0]>=Hdate[0] && Ndate[1]>=Hdate[1] && Ndate[2]>Hdate[2])){
        Axios.post('http://localhost:8080/rent',{
            returndate:Rdate,
            rentdate: RHdate,
            paintingid:props.match.params.id,
            pname:pname,
            image:image
            
        }).then((response) => {
            if(response.data.messages){
                alert("Successfully Rented!!");
                
                }
                else{
                  alert("Please Sign In or Ensure All Details are Filled!");
                }

          });
        }
        else{
            alert("Please enter valid Hiring Date!");
        }
    };

    return <div>
        <div className="Backbutt"><Link to={'/'}><p><FaBackward/>&nbsp;&nbsp;Back to result</p></Link></div>
        <div className="details">
            {products.map(product=>
            <div className="details-image"><img src={product.image} alt="product"/></div>
            )}
            
            <div className="details-info">
            {products.map(product=>
                <ul>
                    <li>
                        <h3>{product.paintingname}</h3>
                    </li>
                    <li>Artist: {product.artistname}</li>
                    <li>Description: {product.description}</li>
                </ul>
            )}
            </div>
            <div className="details-action">
            {products.map(product=>
                <ul className="products-info">
                    <li>Rental Price :{product.rentalcost}</li>
                    {/* <li>Weeks to hire:
                        <select className="weeks" value={week} onChange={(e)=> {setweek(e.target.value)}}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </li> */}
          <input className="weeks" type="text" placeholder="Hiring Date(yyyy-mm-dd)" id="rdate" required onChange={(e) => {
            setHdate(e.target.value);
          }}/>
                    <input className="weeks" type="text" placeholder="Return Date(yyyy-mm-dd)" id="rdate" required onChange={(e) => {
            setdate(e.target.value);
          }}/>

                    {hired==="n" || hired==="" || hired==null?
                    <li><button onClick={rent}>Rent Painting</button><h4>*Please Note your painting will take minimum of 4 days to arrive once Rented..</h4></li>
                    
                    :
                    <h3>Painting Hired!!</h3>
                }
                    
                </ul>
            )}
            
            </div>
            
        </div>
        </div>
}

export default Productscreen;
import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import '../Styles/Details2.css';
import Modal from 'react-modal';
import Care from "./Care";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#d50000',
        },
        secondary: {
            main: '#1b5e20',
        },
    },
});

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#B0E0E6',
        border: 'solid 2px brown'
    },
};

const Details = () => {
    const [restaurent, setRestaurent] = useState({});
    const [restaurentModelData, setRestaurentModelData] = useState({});
    const [galleryModelIsOpen, setGalleryModelIsOpen] = useState(false);
    const [menuItemsModalIsOpen, setMenuItemsModalIsOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const qs = queryString.parse(location.search);
        const { restaurent } = qs;
        
        axios.get(`http://localhost:3002/api/restaurent/getRestaurentDetails/${restaurent}`)
            .then(response => setRestaurent(response.data.data.restaurent))
            .catch(err => console.log(err));
    }, [location.search]);

    const handleModal = async (resmenuId, value) => {
        setMenuItemsModalIsOpen(value);
        if (value) {
            try {
                const menuData = await axios.get(`http://localhost:3002/api/restaurent/Restaurentmenuitems/${resmenuId}`);
                setRestaurentModelData(menuData.data.ResMenu);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const closeModal = () => {
        setMenuItemsModalIsOpen(false);
    }

    const addItemHandler = (minprice) => {
        setTotalPrice(totalPrice + minprice);
    };

    const removeItemHandler = (minprice) => {
        setTotalPrice(totalPrice - minprice);
    }

    const notify = () => {
        toast.success("successfully order placed", { position: toast.POSITION.TOP_LEFT });
    }

    return (
        <div>
            <div>
                <Care />
                <button className="clickSearch" onClick={() => setGalleryModelIsOpen(true)}>Click to see image Gallery</button>
            </div>
            <div className="tabs">
                <h3 className="heading">{restaurent.name}</h3>
                <ul>
                    {
                        restaurent?.cuisine?.map((item, index) => (<li key={index}>{item.name}</li>))
                    }
                </ul>
                <Tabs>
                    <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Contact</Tab>
                    </TabList>
                    <TabPanel className="pannel">
                        <h4 className="Phone">Phone number</h4>
                        <h4>{restaurent.contact_number}</h4>
                        <br />
                        <h3>{restaurent.name}</h3>
                        <p>{restaurent.locality} <br /> {restaurent.city} 636 105</p>
                    </TabPanel>
                    <TabPanel className="pannel">
                        <h4 className="Phone">Phone number</h4>
                        <h4>{restaurent.contact_number}</h4>
                        <br />
                        <h3>{restaurent.name}</h3>
                        <p>{restaurent.locality}<br /> {restaurent.city} 645 945</p>
                    </TabPanel>
                </Tabs>
            </div>
            <div>
                <button className="btn-order" onClick={() => handleModal(restaurent._id, true)}>Place online order</button>
            </div>
            <Modal
                isOpen={menuItemsModalIsOpen}
                style={customStyles}
            >
                <div>
                    <div className="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }} onClick={closeModal}></div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Menu Modal</h2>
                            <ul className="list-group">
                                name : {restaurentModelData.name}
                                <br />
                                city : {restaurentModelData.city}
                                <br />
                                cuisine :
                                {
                                    restaurentModelData?.cuisine?.map((item, index) => (<li key={index}>{item.name}</li>))
                                }
                                Number : {restaurentModelData.contact_number}
                            </ul>
                            <br />
                            <button className="cancelbtn" onClick={closeModal}>Cancel</button>
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <ThemeProvider theme={theme}>
                                <Button onClick={() => removeItemHandler(restaurent.min_price)}>-</Button>
                                <Button color="secondary" onClick={() => addItemHandler(restaurent.min_price)}>+</Button>
                            </ThemeProvider>
                        </div>
                        <div className="col-md-4 offset-md-8 orderdetails">
                            name: {restaurentModelData.name}
                            <br />
                            cuisine :
                            {
                                restaurentModelData?.cuisine?.map((item, index) => (<li key={index}>{item.name}</li>))
                            }
                            Price:{totalPrice}
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <Button className="paynow" color="error" onClick={notify}>pay now</Button>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >
        </div >
    );
}

export default Details;

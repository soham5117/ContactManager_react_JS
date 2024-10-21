import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../Assests/Spinner';
import { ContactServices } from '../../../Services/ContactServices';

const ContactList = () => {
  const [query, setQuery] = useState('');
  const [state, setState] = useState({
    loading: true,
    contacts: [],
    filteredContacts: [],
    errorMessage: ''
  });

  // useEffect to fetch contacts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        let response = await ContactServices.getAllContacts();
        if (response.data) { // Check if response data exists
          setState((prevState) => ({
            ...prevState,
            loading: false,
            contacts: response.data.data,
            filteredContacts: response.data.data
          }));
        } else {
          throw new Error('No data returned');
        }
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: 'Data not found'
        }));
        alert('Data not found');
      }
    };
    fetchData();
  }, []); // Empty dependency array to run only once

  // Delete contact
  const clickDelete = async (contactId) => {
    try {
      await ContactServices.deleteContact(contactId);
      const response = await ContactServices.getAllContacts();
      if (response.data.data) {
        setState((prevState) => ({
          ...prevState,
          contacts: response.data.data,
          filteredContacts: response.data.data
        }));
      } else {
        throw new Error('No data returned');
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: 'Failed to delete contact'
      }));
      alert('Failed to delete contact');
    }
  };

  // Search contact
  const searchContact = (event) => {
    const searchText = event.target.value;
    setQuery(searchText);
    
    const theContacts = state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchText.toLowerCase())
    );
    
    setState((prevState) => ({ ...prevState, filteredContacts: theContacts }));
  };

  let { loading, filteredContacts, errorMessage } = state;

  return (
    <>
      <section className='contact-search'>
        <div className="container p-3">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className='h3'>
                  Contact Manager{' '}
                  <Link to={'/Contacts/add'} className='btn btn-primary ms-2'>
                    <i className='fa fa-plus-circle me-2' />Add
                  </Link>
                </p>
                <p className='fst-italic'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque possimus accusantium illo nemo error. Harum vel aliquam rem. Neque harum modi quas consectetur et accusantium laborum, blanditiis nostrum in sapiente!
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form className='row'>
                <div className="col">
                  <div className="mb-2">
                    <input
                      type="text"
                      name='text'
                      onChange={searchContact}
                      value={query}
                      placeholder='Search name'
                      className='form-control'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <section className='contact-list'>
            <div className="container">
              <div className="row">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => {
                    const { photo, name, mobile, email, id } = contact;
                    return (
                      <div className="col-md-6 mb-4" key={id}>
                        <div className="card d-flex justify-content-around">
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <img src={photo} alt="" className='contact-img' />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">Name: {name}</li>
                                  <li className="list-group-item list-group-item-action">Mobile: {mobile}</li>
                                  <li className="list-group-item list-group-item-action">Email: {email}</li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link to={`/Contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                  <i className='fa fa-eye' />
                                </Link>
                                <Link to={`/Contacts/edit/${contact.id}`} className='btn btn-primary my-1'>
                                  <i className='fa fa-pen' />
                                </Link>
                                <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)}>
                                  <i className='fa fa-trash' />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className='text-center'>No contacts found</p>
                )}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </>
  );
};

export default ContactList;

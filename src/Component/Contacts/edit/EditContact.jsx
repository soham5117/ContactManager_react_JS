import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactServices } from '../../../Services/ContactServices';

const EditContact = () => {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const [state, setState] = useState({
    loading: true,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      title: '',
      company: '',
      groupId: ''
    },
    errorMessage: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactServices.getContact(contactId);
        if (response.data.data) {
          setState({ ...state, loading: false, contact: response.data.data });
        } else {
          throw new Error('Contact not found');
        }
      } catch (error) {
        console.error('Error fetching contact:', error);
        setState({
          ...state,
          loading: false,
          errorMessage: `Failed to fetch contact: ${error.message}`,
        });
        alert('Contact not found');
      }
    };

    fetchContact();
  }, [contactId]);

  const updateHandle = (event) => {
    setState({
      ...state,
      contact: { ...state.contact, [event.target.name]: event.target.value },
    });
  };

  const submitHandle = async (event) => {
    event.preventDefault();
    try {
      setState({ ...state, loading: true });
      const response = await ContactServices.updateContact(state.contact, contactId);
      if (response.data.data) {
        setState({ ...state, loading: false });
        navigate('/Contacts/list', { replace: true });
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      setState({ ...state, loading: false, errorMessage: 'Failed to update contact' });
      alert('Failed to update contact');
    }
  };

  const { loading, contact, errorMessage } = state;

  return (
    <>
      <section className='edit-contact'>
        <div className='container p-3'>
          <div className='row'>
            <div className='col'>
              <p className='h3 text-primary'>Edit Contact</p>
              <p className='fst-italic'>
                Update the contact details below.
              </p>
            </div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className='row align-items-center'>
              <div className='col-md-4'>
                <form onSubmit={submitHandle}>
                  <div className='mb-2'>
                    <input
                      type='text'
                      name='name'
                      onChange={updateHandle}
                      placeholder='NAME'
                      value={contact.name}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='text'
                      name='photo'
                      onChange={updateHandle}
                      placeholder='Photo URL'
                      value={contact.photo}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='number'
                      name='mobile'
                      onChange={updateHandle}
                      placeholder='Mobile'
                      value={contact.mobile}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='email'
                      name='email'
                      onChange={updateHandle}
                      placeholder='Email'
                      value={contact.email}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='text'
                      name='company'
                      onChange={updateHandle}
                      placeholder='Company'
                      value={contact.company}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='text'
                      name='title'
                      onChange={updateHandle}
                      placeholder='Title'
                      value={contact.title}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-2'>
                    <input
                      type='text'
                      name='groupId'
                      placeholder='Group'
                      value={contact.groupId}
                      onChange={updateHandle}
                      className='form-control'
                    />
                  </div>

                  <div>
                    <input
                      type='submit'
                      value='Update'
                      className='btn btn-primary'
                    />
                    <Link
                      to={'/Contacts/list'}
                      className='btn btn-danger ms-2'
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
              <div className='col-md-6'>
                <img
                  src={contact.photo}
                  alt={contact.name}
                  className='contact-img'
                />
              </div>
            </div>
          )}

          {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        </div>
      </section>
    </>
  );
};

export default EditContact;

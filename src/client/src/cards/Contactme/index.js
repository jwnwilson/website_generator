import React from 'react';
import utils from '../../utilities';
import './ContactMe.css';

const mailApiUrlDefault = 'https://mail.jwnwilson-kube.co.uk/send';

class ContactMe extends React.Component {
  constructor(props) {
    super(props);
    this.send_url = props.data.send_url || mailApiUrlDefault;

    this.state = {
      name: '',
      email: '',
      phone_number: '',
      message: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(this.send_url,{
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        if (response.status === 200){
          alert("E-mail Sent I'll be in touch soon!"); 
          this.resetForm();
        }
      }).catch(err => {
        alert("Sorry Message failed to send, please e-mail me directly.");
      });
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPhoneChange = (event) => {
    this.setState({phone_number: event.target.value});
  }

  onMessageChange = (event) => {
    this.setState({message: event.target.value});
  }

  resetForm = () => {
    this.setState({name: '', email: '', message: '', phone_number: ''})
  }

  render() {
    return (
      <section id="contact" className="bg-white">
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0">
Contact Me
          </h2>
          <hr className="star-dark mb-5" />
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <form name="sentMessage" id="contactForm" noValidate="novalidate" onSubmit={this.handleSubmit.bind(this)} method="POST">
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>
Name
                    </label>
                    <input className="form-control" id="name" type="text" value={this.state.name} onChange={this.onNameChange.bind(this)} placeholder="Name" required="required" data-validation-required-message="Please enter your name." />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>
Email Address
                    </label>
                    <input className="form-control" id="email" type="email" value={this.state.email} onChange={this.onEmailChange.bind(this)} placeholder="Email Address" required="required" data-validation-required-message="Please enter your email address." />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>
Phone Number
                    </label>
                    <input className="form-control" id="phone" type="tel" value={this.state.phone_number} onChange={this.onPhoneChange.bind(this)} placeholder="Phone Number" required="required" data-validation-required-message="Please enter your phone number." />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>
Message
                    </label>
                    <textarea className="form-control" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} rows="5" placeholder="Message" required="required" data-validation-required-message="Please enter a message." />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <br />
                <div id="success" />
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-xl" id="sendMessageButton">
Send
                  </button>
                </div>
              </form>
              <div id="result" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContactMe;

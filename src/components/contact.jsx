import { useState } from 'react';

function Contact() {
    const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "d2fce426-c731-450e-9607-8cb4b4bec2c3");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Sent! ThankYou for reaching out." : "Error");
  };
  return (
    <>
    <div id='contact' className='section contact-container'>
        <h2>Contact me</h2>
        <form className='c-form' onSubmit={onSubmit}>
            <label className='c-fnm-lbl'  htmlFor="fnm">Front Name:</label>
            <input className='gh c-fnm-inpt' placeholder="First Name" type="text" name="fnm" id="fnm" />
            <label className='c-lnm-lbl' htmlFor="lnm">Last Name:</label>
            <input className='gh c-lnm-inpt' placeholder="Last Name" type="text" name="lnm" id="lnm" /><br />
            <label className='c-email-lbl' htmlFor="email">Email:</label>
            <input className='c-email-inpt' placeholder="work@email" type="email" name="email" id="email" /><br />
            <label className='c-cmts-lbl' htmlFor="cmts">Comments:</label>
            <textarea className='c-cmts-inpt' placeholder="How Can I Help You ?" name="cmts" id="cmts" /><br />
            <button className='c-btn'>Send</button>
            <p>{result}</p>
        </form>
    </div>
    </>
  )
}

export default Contact;
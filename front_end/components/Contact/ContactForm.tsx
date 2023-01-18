import React, { useContext, useState } from "react";

import Cookies from "js-cookie";
import LayoutContext from "../../context/Context";
import axios from "axios";

const apiHost = process.env.API_HOST;

const ContactForm = () => {
  const { brand_color, primary_color } = useContext(LayoutContext)?.siteSettings || {};
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage({ type: "", text: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ type: "info", text: "Envoi en cours..." });
    if (Object.values(formData).some((value) => value === ""))
      return setMessage({ type: "error", text: "Veuillez remplir tous les champs." });
    await axios.post(`${apiHost}/api/contact-details/message/`, formData, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    setMessage({ type: "success", text: "Votre message a bien été envoyé." });
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };
  return (
    <div className="w-full h-full flex flex-col justify-center mt-4 lg:mt-0">
      <p className="text-xl">
        Pour de plus amples renseignements, le formulaire de contact ci-dessous est à votre disposition ou vous pouvez nous
        appeler.
      </p>
      <form className="flex flex-col text-lg mt-4" onSubmit={onSubmit}>
        <label className="mt-4 font-semibold" htmlFor="name">
          Nom *
        </label>
        <input
          className="mt-4 py-1 px-2"
          type="text"
          name="name"
          id="name"
          style={{ border: `1px solid ${brand_color}` }}
          onChange={onChange}
          value={formData.name}
        />
        <label className="mt-4 font-semibold" htmlFor="email">
          Email *
        </label>
        <input
          className="mt-4 py-1 px-2"
          type="email"
          name="email"
          id="email"
          style={{ border: `1px solid ${brand_color}` }}
          onChange={onChange}
          value={formData.email}
        />
        <label className="mt-4 font-semibold" htmlFor="phone">
          Phone *
        </label>
        <input
          className="mt-4 py-1 px-2"
          type="text"
          name="phone"
          id="phone"
          style={{ border: `1px solid ${brand_color}` }}
          onChange={onChange}
          value={formData.phone}
        />
        <label className="mt-4 font-semibold" htmlFor="message">
          Message *
        </label>
        <textarea
          className="mt-4 p-2"
          name="message"
          id="message"
          cols={30}
          rows={8}
          style={{ border: `1px solid ${brand_color}` }}
          onChange={onChange}
          value={formData.message}
        />
        <div className="flex items-center w-full justify-end mt-4">
          <span className="font-bold text-base mr-4" style={{ color: message.type === "error" ? "rgb(239 68 68)" : brand_color }}>
            {message.text}
          </span>
          <button className="py-2 px-4 font-bold" style={{ backgroundColor: brand_color, color: primary_color }} type="submit">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

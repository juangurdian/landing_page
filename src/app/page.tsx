"use client";
import { useState } from "react";
import Image from "next/image";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz1UGQQxhc2rOMvQsUGIimM1jpLM6gxW7EcxskW4u_Dw1JOmsGgnmdIYXzLOiL_gtki8w/exec";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cedula: "",
    phone: "",
    receipt: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess("¡Participación enviada exitosamente!");
        setForm({ name: "", cedula: "", phone: "", receipt: "", consent: false });
      } else {
        setError("Ocurrió un error al enviar. Intenta de nuevo.");
      }
    } catch {
      setError("Ocurrió un error al enviar. Intenta de nuevo.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#247e37] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/logo.png"
                alt="La Casa de las Lámparas Logo"
                width={120}
                height={48}
                className="object-contain h-12 w-auto mr-3"
                priority
              />
            </div>
            {/* Hamburger menu for mobile */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setNavOpen(!navOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#1e6b2e] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={navOpen}
              >
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {navOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            {/* Desktop nav */}
            <div className="hidden sm:flex sm:space-x-8">
              <a href="#" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Inicio</a>
              <a href="#products" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Productos</a>
              <a href="#raffle" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Sorteo</a>
              <a href="#contact" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Contacto</a>
            </div>
          </div>
        </div>
        {/* Mobile nav links */}
        {navOpen && (
          <div className="sm:hidden bg-[#247e37] px-2 pt-2 pb-3 space-y-1" id="mobile-menu">
            <a href="#" className="block text-white px-3 py-2 rounded-md text-base font-medium">Inicio</a>
            <a href="#products" className="block text-white px-3 py-2 rounded-md text-base font-medium">Productos</a>
            <a href="#raffle" className="block text-white px-3 py-2 rounded-md text-base font-medium">Sorteo</a>
            <a href="#contact" className="block text-white px-3 py-2 rounded-md text-base font-medium">Contacto</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/flower-pattern.png')] opacity-5"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Mes de las Madres
              </span>
            </div>
            <h1 className="text-4xl tracking-tight font-serif font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Sorteo Especial</span>
              <span className="block text-[#247e37] mt-2">Día de las Madres</span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
              Celebra a mamá con nosotros y participa en nuestros sorteos semanales. ¡Gana increíbles premios!
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
              <div className="rounded-md shadow-lg transform hover:scale-105 transition-transform duration-200">
                <a href="#raffle" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#247e37] hover:bg-[#1e6b2e] md:py-4 md:text-lg md:px-10 transition-colors duration-200">
                  Participar Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raffle Explanation Section */}
      <div id="raffle" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-extrabold text-gray-900 sm:text-4xl">
              ¿Cómo Participar?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Sigue estos simples pasos para participar en nuestros sorteos semanales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Pasos para Participar</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#247e37] flex items-center justify-center text-white font-bold mr-3">1</span>
                  <span className="text-gray-600">Visítanos en tienda</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#247e37] flex items-center justify-center text-white font-bold mr-3">2</span>
                  <span className="text-gray-600">Realiza una compra mayor a C$1,000</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#247e37] flex items-center justify-center text-white font-bold mr-3">3</span>
                  <span className="text-gray-600">Escanea el código QR en tienda</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#247e37] flex items-center justify-center text-white font-bold mr-3">4</span>
                  <span className="text-gray-600">Ingresa tus datos y ¡participa!</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Información Importante</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-[#247e37] mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-900 font-medium">Sorteos Semanales</p>
                    <p className="text-gray-600">Los ganadores se anuncian los sábados a las 10am en nuestras redes sociales</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-[#247e37] mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-900 font-medium">Premio Especial</p>
                    <p className="text-gray-600">También participas por un premio sorpresa al cierre del mes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Showcase Section */}
      <div id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-extrabold text-gray-900 sm:text-4xl">
              Regalos Perfectos para Mamá
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Descubre nuestra colección exclusiva de lámparas y accesorios
            </p>
          </div>
          {/* Simple Carousel */}
          <div className="w-full max-w-md mx-auto">
            <div className="relative">
              {/* Carousel slides (replace with real images as needed) */}
              <div className="carousel flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4">
                <div className="snap-center shrink-0 w-64 bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center">
                  <Image src="/lamp1.jpeg" alt="Lámpara Moderna" width={180} height={180} className="rounded mb-2 object-contain" />
                  <span className="font-serif font-medium text-gray-900 text-lg">Lámpara Moderna</span>
                </div>
                <div className="snap-center shrink-0 w-64 bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center">
                  <Image src="/lamp2.jpeg" alt="Lámpara Clásica" width={180} height={180} className="rounded mb-2 object-contain" />
                  <span className="font-serif font-medium text-gray-900 text-lg">Lámpara Clásica</span>
                </div>
                <div className="snap-center shrink-0 w-64 bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center">
                  <Image src="/lamp3.jpeg" alt="Lámpara LED" width={180} height={180} className="rounded mb-2 object-contain" />
                  <span className="font-serif font-medium text-gray-900 text-lg">Lámpara LED Inteligente</span>
                </div>
              </div>
              <div className="text-center mt-4 text-gray-500 text-sm">Desliza para ver más productos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="form" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl font-serif font-extrabold text-gray-900 text-center mb-8">Participa en el Sorteo</h2>
            <form className="space-y-6 bg-white p-8 rounded-lg shadow-xl" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre Completo
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-[#247e37] focus:border-[#247e37] block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
                  Cédula
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="cedula"
                    id="cedula"
                    value={form.cedula}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-[#247e37] focus:border-[#247e37] block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Tu número de cédula"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Celular
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-[#247e37] focus:border-[#247e37] block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="+505 XXXX-XXXX"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">
                  Número de Factura
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="receipt"
                    id="receipt"
                    value={form.receipt}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-[#247e37] focus:border-[#247e37] block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Número de tu factura"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={handleChange}
                    className="focus:ring-[#247e37] h-4 w-4 text-[#247e37] border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="consent" className="font-medium text-gray-700">
                    Acepto los términos y condiciones del sorteo
                  </label>
                </div>
              </div>

              {success && <div className="text-green-600 text-center font-medium">{success}</div>}
              {error && <div className="text-red-600 text-center font-medium">{error}</div>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#247e37] hover:bg-[#1e6b2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#247e37] transform hover:scale-105 transition-all duration-200 disabled:opacity-60"
                  disabled={submitting}
                >
                  {submitting ? "Enviando..." : "Enviar Participación"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-gray-900 text-lg font-serif font-bold mb-4">La Casa de las Lámparas</h3>
              <p className="text-gray-600">Iluminando tu hogar desde 1990</p>
            </div>
            <div className="text-center">
              <h3 className="text-gray-900 text-lg font-serif font-bold mb-4">Contacto</h3>
              <p className="text-gray-600">Tel: +505 2277-2573</p>
              <p className="text-gray-600">Email: info@lacasadelaslamparas.com</p>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-gray-900 text-lg font-serif font-bold mb-4">Síguenos</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 La Casa de las Lámparas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

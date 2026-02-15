import { useState } from "react";

export default function Questionnaire() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);

  const submit = () => {
    console.log("Feedback enviado:", formData);
    alert("¡Gracias por tu opinión! La recibimos correctamente.");
    // Aquí podrías conectar con Formspree, Google Forms, etc. más adelante
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">
        Feedback de la ruta
      </h2>

      {step === 1 && (
        <div>
          <label className="block mb-2 font-medium">
            1. Dificultad percibida (1=fácil, 5=muy dura)
          </label>
          <input
            type="range"
            min="1"
            max="5"
            name="dificultad"
            onChange={handleChange}
            className="w-full"
            defaultValue="3"
          />
          <p className="text-center mt-2 text-lg font-semibold">
            {formData.dificultad || 3}
          </p>
          <button
            onClick={nextStep}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block mb-2 font-medium">
            2. ¿Fueron suficientes las paradas y descansos?
          </label>
          <select
            name="paradas"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="">Selecciona...</option>
            <option value="sí">Sí, perfectas</option>
            <option value="regular">Más o menos</option>
            <option value="no">No, faltaron</option>
          </select>
          <button
            onClick={nextStep}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block mb-2 font-medium">
            3. ¿Qué te sorprendió más? (especie, historia, paisaje...)
          </label>
          <textarea
            name="sorpresa"
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded"
            placeholder="Ej: los helechos gigantes, la ubicación del monasterio..."
          />
          <button
            onClick={nextStep}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <label className="block mb-2 font-medium">
            4. Sugerencias para próximas salidas
          </label>
          <textarea
            name="sugerencias"
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border rounded"
            placeholder="Ideas, mejoras, destinos que te gustaría..."
          />
          <button
            onClick={submit}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Enviar opinión
          </button>
        </div>
      )}
    </div>
  );
}

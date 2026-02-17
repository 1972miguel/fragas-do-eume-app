import { useState } from "react";

export default function Questionnaire() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);

  const submit = async () => {
    console.log("Feedback enviado:", formData);
    alert("¡Gracias por tu opinión! La hemos recibido correctamente.");

    // Envío a Google Sheets (ver punto 3)
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzkxhTzdkLc6MNqLL0ntz1XUCF07Lw7hzm_jEwRC5j8Lq1FdMJFFXi6FhkOfIkmF2QZ/exec",
        {
          // ← pega aquí TU URL del script
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      console.log("Enviado a Google Sheets");
    } catch (error) {
      console.error("Error al enviar:", error);
    }
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
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
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
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
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
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
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
            onClick={nextStep}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Siguiente
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <label className="block mb-2 font-medium">
            5. ¿Qué opinión tienes sobre el tiempo dedicado a las paradas
            culturales?
          </label>
          <textarea
            name="paradas_culturales"
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded"
            placeholder="Ej: suficiente, demasiado corto, bien equilibrado..."
          />
          <button
            onClick={nextStep}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Siguiente
          </button>
        </div>
      )}

      {step === 6 && (
        <div>
          <label className="block mb-2 font-medium">
            6. ¿Sientes que la organización garantizó la seguridad en todo
            momento?
          </label>
          <select
            name="seguridad"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="">Selecciona...</option>
            <option value="totalmente">Totalmente de acuerdo</option>
            <option value="bastante">Bastante de acuerdo</option>
            <option value="regular">Ni de acuerdo ni en desacuerdo</option>
            <option value="poco">Poco de acuerdo</option>
            <option value="nada">Nada de acuerdo</option>
          </select>
          <button
            onClick={nextStep}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Siguiente
          </button>
        </div>
      )}

      {step === 7 && (
        <div>
          <label className="block mb-2 font-medium">
            7. ¿Cuál fue tu punto de interés favorito?
          </label>
          <input
            type="text"
            name="favorito"
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Ej: el Monasterio, el puente colgante, los helechos..."
          />
          <button
            onClick={submit}
            className="mt-6 w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 font-bold"
          >
            Enviar opinión
          </button>
        </div>
      )}
    </div>
  );
}

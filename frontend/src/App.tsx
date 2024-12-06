import { SlInput } from "@shoelace-style/shoelace/dist/react";
import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.0/cdn/"
);

const App = () => {
  const [dogsName, setDogsName] = useState<string>("");
  const navigate = useNavigate();

  const submitForm = async () => {
    if (!dogsName) {
      alert("no dog name entered");
    }
    try {
      const response = await fetch("http://localhost:8080/doghouses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: dogsName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        alert(`Failed to create doghouse: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      console.log("Doghouse created:", data);
      alert(`Doghouse '${data.Name}' created successfully!`);

      navigate(`/${encodeURIComponent(data.Name)}`);
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred while creating the doghouse.");
    }
  };

  return (
    <div
      className={`flex flex-col items-center min-h-[100dvh] justify-center gap-[24px]`}
    >
      <div className={`text-2xl font-bold`}>Welcome to the Doghouse!</div>
      <div className="text-lg font-medium">
        Enter your dog's name to get started.
      </div>
      <SlInput
        value={dogsName}
        onSlChange={(event) => {
          setDogsName(event.target.value);
        }}
        label="Dog's name"
        help-text="What's the name of your dog?"
      ></SlInput>
      <SlButton variant="primary" onClick={() => submitForm()}>
        Create a doghouse!
      </SlButton>
      <img
        src="https://pub-45779459613f492fa1ccc087f8c48998.r2.dev/DALL%C2%B7E%202024-12-05%2023.23.32%20-%20A%20cartoon-style%20illustration%20of%20a%20doghouse%2C%20with%20bright%2C%20cheerful%20colors.%20The%20doghouse%20is%20red%20with%20a%20white%20roof%2C%20sitting%20on%20a%20grassy%20lawn.%20A%20blue%20sky%20.webp"
        className={`h-[300px]`}
      />
    </div>
  );
};

export default App;

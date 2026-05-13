import MainLayout from "./components/MainLayout";
import "./styles/Style.css";
import Router from "./routes";
import background from "/desk_bg.png";
import { useCallback, useEffect, useState } from "react";
import { listEncounters } from "./modules/encounter-api";
import { Encounter } from "./modules/encounter-api";

export default function App() {
  const [encounters, setEncounters] = useState<Encounter[]>([]);

  const refreshEncounters = useCallback(async () => {
    const result = await listEncounters();
    setEncounters(result.data ?? []);
  }, []);
  useEffect(() => {
    refreshEncounters();
  }, [refreshEncounters]);

  return (
    <MainLayout
      encounterList={encounters}
      refreshEncounters={refreshEncounters}
    >
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Router
          refreshEncounters={refreshEncounters}
          encounterList={encounters}
        />
      </div>
    </MainLayout>
  );
}

// src/pages/Progress.tsx
import React, { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/pageHeader/PageHeader";
import Drawer from '@mui/material/Drawer';
import { Workout } from "../types/workout"; // Import the interface
import { Movement } from "../types/movement"; // Import the interface

const ProgressTracker: React.FC = () => {
    //const navigate = useNavigate();

    const [workouts, setWorkouts] = React.useState<Workout[]>([]);
    const [movements, setMovements] = React.useState<Movement[]>([]); // Replace 'any' with the actual type if available
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedMovementType, setSelectedMovementType] = React.useState("Body Weight");

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    
    const toggleDrawer = (newDrawerOpen: boolean) => () => {
      console.log('inside toggleDrawer');
      setDrawerOpen(newDrawerOpen);
    };

    const uniqueMovementTypes = ["Body Weight", ...new Set(workouts.map(workout => workout.movements.map(movement => movement.movement_type_name)).flat())];

    const filteredMovements = selectedMovementType === "Body Weight"
      ? movements
      : movements.filter(movement => movement.movement_type_name === selectedMovementType);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch("https://yoked-backend-production.up.railway.app/api/workouts");
              if (!response.ok) throw new Error("Failed to fetch workouts");
      
              const data: Workout[] = await response.json();
      
              const sortedWorkouts = data.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              );
      
              setWorkouts(sortedWorkouts);
              setMovements(sortedWorkouts.flatMap(workout => workout.movements)); // Flatten the movements array
              console.log('inside fetchData');
            } catch (err) {
                setError(err as string);
            } finally {
                setLoading(false);
            }
        };

      fetchData();
    }, []);

  return (
    <Layout>
      <PageHeader title="progress tracker" cornerTitle="" variant="hamburger" cornerTitleOnClick={toggleDrawer(true)}/>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div style={{ width: "100%"}}>
            <select
                value={selectedMovementType}
                onChange={(e) => setSelectedMovementType(e.target.value)}
                className="border px-2 py-1 mb-4"
              >
                {uniqueMovementTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
            </select>

            { selectedMovementType === "Body Weight" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workouts.map((workout) => (
                  <div key={workout.id} className="border p-4 rounded shadow">
                      <h3 className="text-lg font-semibold">{workout.date}</h3>
                      <p>{workout.body_weight}</p>                  </div>
              ))}
          </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMovements.map((movement) => (
                    <div key={movement.id} className="border p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">{movement.movement_type_name}</h3>
                        <p>{movement.id}</p>                  </div>
                ))}
            </div>
            )
            }
            
            </div>
      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer(false)}>
      hey
    </Drawer>
  </Layout>
  )
};

export default ProgressTracker;

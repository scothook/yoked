// src/pages/Progress.tsx
import React, { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/pageHeader/PageHeader";
import Drawer from '@mui/material/Drawer';

const ProgressTracker: React.FC = () => {
    //const navigate = useNavigate();

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    
      const toggleDrawer = (newDrawerOpen: boolean) => () => {
        console.log('inside toggleDrawer');
        setDrawerOpen(newDrawerOpen);
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
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
      <PageHeader title="past workouts" cornerTitle="" variant="hamburger" cornerTitleOnClick={toggleDrawer(true)}/>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer(false)}>
      hey
    </Drawer>
  </Layout>
  )
};

export default ProgressTracker;

import { Typography, Button } from "@mui/material"; // Import de Material-UI

function Home() {
  return (
    <section className="full-screen">
      <div className="container-fluid flex-grow-1">
        <div className="row mt-3 h-100">
          <div className="col-12 d-flex">
            <div className="large-container p-4 mb-4 w-100 d-flex flex-column">
              <Typography variant="h5">Large Container</Typography>
              <Typography variant="body2" className="mt-2">
                This is a large container, placed to the right side.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

import AddIcon from "@material-ui/icons/Add";
import { makeStyles, IconButton, Box, Typography, Button, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { LinearLoadingSkeleton } from "../../shared/components/LinearLoadingSkeleton";
import { Helmet } from "react-helmet-async";
import { DeploymentListRow } from "../DeploymentList/DeploymentListRow";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
    "& .MuiListItemText-secondary .MuiSvgIcon-root:not(:first-child)": {
      marginLeft: "5px"
    },
    "& .MuiListItemText-secondary .MuiSvgIcon-root": {
      fontSize: "20px"
    }
  },
  titleContainer: {
    paddingBottom: "1rem",
    display: "flex",
    alignItems: "center"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold"
  },
  noActiveDeployments: {
    marginBottom: "1rem"
  },
  createBtn: {
    marginLeft: "auto"
  }
}));

export function Dashboard({ deployments, isLoadingDeployments, refreshDeployments }) {
  const classes = useStyles();

  useEffect(() => {
    refreshDeployments();
  }, []);

  const orderedDeployments = deployments ? [...deployments].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).filter((d) => d.state === "active") : [];

  return (
    <>
      <Helmet title="Dashboard" />
      <LinearLoadingSkeleton isLoading={isLoadingDeployments} />
      <Box className={classes.root}>
        <Box className={classes.titleContainer}>
          <Typography variant="h3" className={classes.title}>
            Active Deployments
          </Typography>

          <Box marginLeft="1rem">
            <IconButton aria-label="back" onClick={refreshDeployments}>
              <RefreshIcon />
            </IconButton>
          </Box>

          {orderedDeployments.length > 0 && (
            <Button className={classes.createBtn} variant="contained" size="medium" color="primary" component={Link} to="/createDeployment">
              <AddIcon />
              &nbsp;Create Deployment
            </Button>
          )}
        </Box>

        <Box>
          {orderedDeployments.length > 0 ? (
            orderedDeployments.map((deployment) => <DeploymentListRow key={deployment.dseq} deployment={deployment} />)
          ) : (
            <Box textAlign="center" padding="4rem">
              {isLoadingDeployments ? (
                <Box paddingBottom="1rem">
                  <CircularProgress size="2.5rem" />
                </Box>
              ) : (
                <Typography variant="h5" className={classes.noActiveDeployments}>
                  No active deployments
                </Typography>
              )}

              <Button variant="contained" size="medium" color="primary" component={Link} to="/createDeployment">
                <AddIcon />
                &nbsp;Create Deployment
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

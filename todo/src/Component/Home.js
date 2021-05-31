import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import TodoMange from './TodoMange';
import ListofTodo from './ListofTodo';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "400px",

    },

    appbar: {
        width: '100%',
        height: "70px",
        backgroundColor: 'white',
        padding: theme.spacing(2)



    },

    tabpanel: {
        color: "black",
        marginLeft: theme.spacing(8),
    },

    tabs: {
        marginLeft: theme.spacing(8)

    },

    formControl: {
        minWidth: 120,
        marginLeft:'40px',
        top:'-10px'
        
        
    },
    sectionright: {

        backgroundColor: 'red',
        width: '20px',
        height: '10px'


    },
    Inputtextcolor:{
        color:'black'
    },
    sectionforproduct:{
        margin:theme.spacing(4)

    }
}));

export default function Todo(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
     
            <div className={classes.root}>
                <AppBar position="static" className={classes.appbar} >
                    <Grid container>
                        <Grid item xs={12}  sm={12} md={12} lg={2} >
                            

                        </Grid>

                        <Grid item xs={12} md={6} lg={8} sm={6}>
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabs}>
                                <Tab label="ShowTodoList" {...a11yProps(0)} className={classes.tabpanel} />
                                <Tab label="TodoAdd" {...a11yProps(1)} className={classes.tabpanel} />

                            </Tabs>

                        </Grid>
                    </Grid>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <ListofTodo/>
      </TabPanel>
                <TabPanel value={value} index={1}>
                 <div className={classes.sectionforproduct}>
                   <TodoMange />
                </div>   
      </TabPanel>

            </div>


        </>
    )
}
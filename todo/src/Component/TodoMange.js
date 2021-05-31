import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import React from 'react';
import * as TodoServices from '../Services/TodolistServices';
import Notification from '../Component/Notification';


let defaultvalues = {
    id: 0,
    expensename: '',
    price: '',
    expenseDescription: '',
    expenseimage: ''


}

const styles = makeStyles((them) => ({
    formInputWidth: {
         paddingTop:them.spacing(2),
         marginTop:them.spacing(2),
        '& .MuiFormControl-root': {
            width: '70%',
            margin: them.spacing(1)
        }
    },
    fontwidth: {
        fontSize: '15px',
        marginLeft: them.spacing(2),
        color: 'black',



    },
    textareawidth: {
        width: '70%',
        height: '60%',
        fontSize: '20px',
        fontWeight: '200',
        color: 'black',
        padding: them.spacing(3),




    },
    input: {
        display: 'none'
    },
    table:{
        minWidth:650,
    },
    margin: {
        margin: them.spacing(1),
      },

}))

export default function TodoMange(props) {

    const classes = styles();
    const [selectItem, setSelectItem] = React.useState(defaultvalues);
    const [records,setRecords]=React.useState(TodoServices.getallProducts());
    const [notify,setNotify] = React.useState({isOpen:false,message:'',type:''})

    console.log(selectItem.productDescription);

    const handleItem = e => {
        const { name, value } = e.target;
        setSelectItem({
            ...selectItem,
            [name]: value
        })
    }

    

    const handlefile=( e)=>{
        var file  = e.target.files[0];
        console.log(file)
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            
            localStorage.setItem('image', reader.result);
            selectItem.expenseimage=localStorage.getItem('image');
        });
        reader.readAsDataURL(file);
     
    }

      const handlesubmit=(e)=>{

        if(selectItem.expensename && selectItem.price){
            TodoServices.insertProduct(selectItem);
            setRecords(TodoServices.getallProducts());
            setNotify({
                isOpen:true,
                message:'Submitted Sucessfully',
                type:'success'
            })

        }else{
            alert("Plz fill the form for necessary fields")
        }

        e.preventDefault();
      }



    return (
        <>
            <form className={classes.formInputWidth} id='userform' onSubmit={handlesubmit}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <h6  className={classes.fontwidth}>
                        ExpenseName
            </h6>
                        <TextField
                            label='ExpenseName'
                            variant='outlined'
                            name='expensename'
                            value={selectItem.expensename}
                            onChange={handleItem}
                            placeholder='Enter Expense name' 
                            autoComplete='off'/>



                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                    <h6  className={classes.fontwidth}>
                             ExpensePrice
            </h6>
                        <TextField
                            label='Price'
                            variant='outlined'
                            name='price'
                            value={selectItem.price}
                            onChange={handleItem}
                            placeholder='Enter Price' 
                            autoComplete='off'/>


                    </Grid>
                </Grid>
                <br />
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                    <h6  className={classes.fontwidth}>
                            Expense Description(optional)
            </h6>
                        <textarea rows="4" cols="50" name="expenseDescription" form='userform' value={selectItem.expenseDescription} onChange={handleItem} className={classes.textareawidth} placeholder='Enter description' />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                    <h6  className={classes.fontwidth}>
                            expense Image(optional)
            </h6>

                        <div className="custom-file">
                            <input type="file" class="custom-file-input" id="myfile" onChange={handlefile}  name='expenseimage' />
                            <label class="custom-file-label">Choose file...</label>
                        </div>

                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Button variant="contained" size="large" color="primary" className={classes.margin} type="submit">
          Add Expense
        </Button>
                    </Grid>

                </Grid>
            </form>

            <br />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records ? records.map((row)=>(
                            <TableRow key={row.id}>
                                <TableCell><img src={row.expenseimage}  alt="loading" width="50px" height="60px"/></TableCell>
                                <TableCell component="th" scope="row">
                                    {row.expensename}
                                </TableCell>
                                <TableCell align="right">{row.expenseDescription}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow>

                        )):[]}
                    </TableBody>
                </Table>
            </TableContainer>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    )
}
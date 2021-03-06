import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Chip } from '@material-ui/core';
import {updateInterests} from '../../../Services/profile'
// import { cookieUserId } from '../../../utils/cookies'
import { UserContext } from '../../UserContext'





const useStyles = makeStyles({
	root: {
		marginTop: '3rem',
		padding: '2rem'
		
	  },
	checkboxFormControl: {
	display: 'block'
	
	},
  });

export default function Interests(props)
{
	const classes = useStyles();
	var [interests, setInterests] = React.useState([]);
	var [interest, setInterest] = React.useState("#");
	const { userData } = useContext(UserContext);
	
	
	const handleAddInterest = (event) => {
		setInterests(interests.concat(interest));
		setInterest("#")
	};

	const handleInterestChange = (event) => setInterest(event.target.value);

	const handleDelete = (chipToDelete)  => {
		setInterests((interests) => interests.filter((i) => i !== chipToDelete));
	  };

	const handleSubmitInterests = () => {
		// const userId = cookieUserId()
		const userId = userData.data.id
		updateInterests(handleSuccess, handleError, userId, interests)
	}
	const handleSuccess = (respose) =>{
		props.next()
	}
	const handleError = (error) => {
	}
	
	return (
		<Paper elevation={5} className={classes.root}>
			<Typography variant={"h1"} align={"center"}>Interests</Typography> 
			<Typography variant={"h5"} align={"center"}>
				Please choose one or more interests.
			</Typography> 

			<div>
				{interests.map((int) => 
					
					<Chip label={int} key={int} onDelete={handleDelete} color="primary" id={int}/>

				)}
			</div>
			<form method="POST" className={classes.form} noValidate>
			
			<Grid container>
				<Grid item xs={12} sm={10}>
					<TextField
						variant="outlined"
						// margin="normal"
						value={interest}
						fullWidth
						id="interest"
						label="#interest"
						name="insterest"
						onChange={handleInterestChange}
						autoFocus
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						size={"large"}
						onClick={handleAddInterest}
					>
						Add
						</Button>

				</Grid>
			</Grid>
			</form>
			
			
			
			   
			
		 
			<Button color={"primary"} size={"large"} variant={"contained"} onClick={handleSubmitInterests}>Next ></Button>
		</Paper  >
	);
}
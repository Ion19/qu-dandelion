import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip'; 
import Button from '@material-ui/core/Button';
import {suggestData} from './suggestionData';
import axios from 'axios';


// const suggestionList=suggestData.map((label)=>({label:label}))
// const suggestions = [
//   { label: 'Afghanistan' },
//   { label: 'Aland Islands' },
//   { label: 'Albania' },
//   { label: 'Algeria' },
//   { label: 'American Samoa' },
//   { label: 'Andorra' },
//   { label: 'Angola' },
//   { label: 'Anguilla' },
//   { label: 'Antarctica' },
//   { label: 'Antigua and Barbuda' },
//   { label: 'Argentina' },
//   { label: 'Armenia' },
//   { label: 'Aruba' },
//   { label: 'Australia' },
//   { label: 'Austria' },
//   { label: 'Azerbaijan' },
//   { label: 'Bahamas' },
//   { label: 'Bahrain' },
//   { label: 'Bangladesh' },
//   { label: 'Barbados' },
//   { label: 'Belarus' },
//   { label: 'Belgium' },
//   { label: 'Belize' },
//   { label: 'Benin' },
//   { label: 'Bermuda' },
//   { label: 'Bhutan' },
//   { label: 'Bolivia, Plurinational State of' },
//   { label: 'Bonaire, Sint Eustatius and Saba' },
//   { label: 'Bosnia and Herzegovina' },
//   { label: 'Botswana' },
//   { label: 'Bouvet Island' },
//   { label: 'Brazil' },
//   { label: 'British Indian Ocean Territory' },
//   { label: 'Brunei Darussalam' },
// ];


function renderInput(inputProps) {
  const {
    InputProps,
    classes,
    ref,
    ...other
  } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}




class ExQuMultiFilter extends React.PureComponent {
  state = {
    inputValue: '',
    selectedItem: [],
    filterType:'multi-select', 
    filterKey:this.props.filterKey, 
    suggestions:[
      // { label: 'Afghanistan' },
      // { label: 'Aland Islands' },
      // { label: 'Albania' },
      // { label: 'Algeria' },
      // { label: 'American Samoa' },
      // { label: 'Andorra' },
      // { label: 'Angola' },
      // { label: 'Anguilla' },
      // { label: 'Antarctica' },
      // { label: 'Antigua and Barbuda' },
      // { label: 'Argentina' },
      // { label: 'Armenia' },
      // { label: 'Aruba' },
      // { label: 'Australia' },
      // { label: 'Austria' },
      // { label: 'Azerbaijan' },
      // { label: 'Bahamas' },
      // { label: 'Bahrain' },
      // { label: 'Bangladesh' },
      // { label: 'Barbados' },
      // { label: 'Belarus' },
      // { label: 'Belgium' },
      // { label: 'Belize' },
      // { label: 'Benin' },
      // { label: 'Bermuda' },
      // { label: 'Bhutan' },
      // { label: 'Bolivia, Plurinational State of' },
      // { label: 'Bonaire, Sint Eustatius and Saba' },
      // { label: 'Bosnia and Herzegovina' },
      // { label: 'Botswana' },
      // { label: 'Bouvet Island' },
      // { label: 'Brazil' },
      // { label: 'British Indian Ocean Territory' },
      // { label: 'Brunei Darussalam' },
    ]
  };

  componentDidMount(){
     
    if(this.props.data!==''){
      let filterText;
    filterText=this.props.data.filter((filterTag)=>(filterTag.filterKey===this.props.filterKey))
      if (filterText.length!==0){  
      const [{filter}] = filterText; 
      this.setState({selectedItem:[...filter]})
    console.log(filter)
  }
}
}

 getSuggestions=(inputValue)=> {
  let count = 0;

  return this.state.suggestions.filter(suggestion => {
    const keep = (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) && count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

renderSuggestion=({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
})=> {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}


  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value }, 
      ()=>(
        (this.state.inputValue.length > 1 )?
        axios.get(this.props.urlMultiSuggestion,{
          params:[{filterKey:this.state.filterKey, filterType:this.state.filterType , query:this.state.inputValue}]
        })
        .then((res)=>console.log(res))
        .then(this.setState({suggestions:suggestData.map((label)=>({label:label}))}))
        .catch((err)=>console.log(err))

        :null 

      ));
  };

  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }
    console.log('selectedItem',this.state.selectedItem)

    this.setState({
      inputValue: '',
      selectedItem, 
      suggestions:[]
    },()=>console.log('selectedItem',this.state.selectedItem)
);
  };

  handleDelete = item => () => {
    const { selectedItem } = this.state;
    const selectedItemConst = [...selectedItem];
    selectedItemConst.splice(selectedItemConst.indexOf(item), 1);

    this.setState({ selectedItem: selectedItemConst } , ()=>console.log(selectedItem));
   
  };

  handleSubmitFilter=()=>{
    this.props.handleSubmitFilter(this.props.filterKey,this.state.selectedItem,this.state.filterType); 
}        
  

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <>
      <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedItem}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: 'Select multiple countries',
                id: 'integration-downshift-multiple',
              }),
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {this.getSuggestions(inputValue2).map((suggestion, index) => this.renderSuggestion({
                  suggestion,
                  index,
                  itemProps: getItemProps({ item: suggestion.label }),
                  highlightedIndex,
                  selectedItem: selectedItem2,
                }))}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>

      <Button 
      variant="contained" 
      color="primary"  
      onClick={this.handleSubmitFilter}>
          Search
      </Button>    

      </>

    );
  }
}

ExQuMultiFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 100,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});



export default withStyles(styles)(ExQuMultiFilter)
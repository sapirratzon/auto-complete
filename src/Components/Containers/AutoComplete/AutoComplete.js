import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import "./AutoComplete.css"
import Input from "../../UI/Input/Input";
import DropDown from "../../UI/DropDown/DropDown";


const AutoComplete = () => {

    const [userCountryInput, setUserCountryInput] = useState('');
    const [selectedCountry, setSelectedCountry] = useState({});
    const [countries, setCountries] = useState([]);
    const noCountriesMessage = 'No Results Found';

    const [debouncedSearchInput] = useDebounce(userCountryInput, 300);

    const getCountries = useCallback(async () => {
        const xhrGetCountries = new XMLHttpRequest();
        xhrGetCountries.addEventListener('load', () => {
            if (xhrGetCountries.status === 401) {
                console.log("Error 401");
            } else {
                const countries = JSON.parse(xhrGetCountries.responseText);
                setCountries(countries.map(countryName => countryName.name));
                if (countries.length === 0)
                    setCountries([noCountriesMessage]);
            }
        });
        xhrGetCountries.open('GET', `${ process.env.REACT_APP_API }/getCountries/${ debouncedSearchInput }`);
        xhrGetCountries.send();
    }, [debouncedSearchInput]);

    useEffect(() => {
        if (debouncedSearchInput && debouncedSearchInput !== selectedCountry) {
            getCountries();
        } else {
            setCountries([]);
            setSelectedCountry('');
        }
    }, [debouncedSearchInput, getCountries, selectedCountry]);


    const handleUserSelect = useCallback((event, locationID) => {
        const country = event.target.innerText;
        if (country !== noCountriesMessage)
            setUserCountryInput(country);
        setSelectedCountry(country);
        setCountries([]);
    }, []);

    const handleUserInput = event => {
        setUserCountryInput(event.target.value);
        if (!event.target.value)
            setCountries([]);
    };

    const handleClearInput = (event,) => {
        setUserCountryInput('');
        setCountries([]);
    };


    return (
        <div className="autoComplete" >
            <Input
                textLabel="Enter a place"
                options={ countries }
                setSelect={ handleUserSelect }
                setInput={ handleUserInput }
                userInput={ userCountryInput }
                clearInput={ handleClearInput } />
            { Object.keys(countries).length > 0 &&
            <DropDown
                options={ countries }
                setSelect={ handleUserSelect } />
            }
        </div >
    )
};

export default AutoComplete;

import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Select, message, Modal, List, Typography, Tooltip } from 'antd'
import {
    LeftOutlined
} from '@ant-design/icons'

function Detail({ setPageType, episode_id, reduxMovieList,
    currentMovie, charsNum, planetsNum, starshipsNum, vehiclesNum, speciesNum }) {
    // const [currentMovie, setCurrentMovie] = React.useState({})
    const [charsList, setCharsList] = React.useState([])
    const [planetsList, setPlanetsList] = React.useState([])
    const [starshipsList, setStarshipsList] = React.useState([])
    const [vehiclesList, setVehiclesList] = React.useState([])
    const [speciesList, setSpeciesList] = React.useState([])
    React.useEffect(() => {
        setPageType("detail")
        // if (reduxMovieList.length === 0) getCurrentMovie()
        // else {
        //     const result = reduxMovieList.find(movie => {
        //         return movie.episode_id === episode_id * 1
        //     })
        //     setCurrentMovie(result)
        // }

        const getChar = async item => {
            return await fetch(`https://swapi.dev/api/people/${item}`).
                then(res => res.json())
        }
        const getCharsList = async () => {
            return Promise.all(charsNum.map(item => getChar(item)))
        }
        getCharsList().then(data => {

            setCharsList(data)
        })
        const getPlanet = async item => {
            return await fetch(`https://swapi.dev/api/planets/${item}`).
                then(res => res.json())
        }
        const getPlanetsList = async () => {
            return Promise.all(planetsNum.map(item => getPlanet(item)))
        }
        getPlanetsList().then(data => {
            setPlanetsList(data)
        })
        const getStarship = async item => {
            return await fetch(`https://swapi.dev/api/starships/${item}`).
                then(res => res.json())
        }
        const getStarshipsList = async () => {
            return Promise.all(starshipsNum.map(item => getStarship(item)))
        }
        getStarshipsList().then(data => {
            setStarshipsList(data)
        })
        const getVehicle = async item => {
            return await fetch(`https://swapi.dev/api/vehicles/${item}`).
                then(res => res.json())
        }
        const getVehiclesList = async () => {
            return Promise.all(vehiclesNum.map(item => getVehicle(item)))
        }
        getVehiclesList().then(data => {
            setVehiclesList(data)
        })
        const getSpecie = async item => {
            return await fetch(`https://swapi.dev/api/species/${item}`).
                then(res => res.json())
        }
        const getSpeciesList = async () => {
            return Promise.all(speciesNum.map(item => getSpecie(item)))
        }
        getSpeciesList().then(data => {
            setSpeciesList(data)
        })
    }, [])



    return (

        <Card title={<a href="/"><LeftOutlined /></a>}>
            <List
                header={<div style={{ font: "180% Helvetica, sans-serif" }}>{currentMovie.title}</div>}

            >
                <List.Item>
                    Episode ID: {currentMovie.episode_id}
                </List.Item>
                <List.Item>
                    Opening Crawl: {currentMovie.opening_crawl}
                </List.Item>
                <List.Item>
                    Director: {currentMovie.director}
                </List.Item>
                <List.Item>
                    Producer: {currentMovie.producer}
                </List.Item>
                <List.Item>
                    Release Date: {currentMovie.release_date}
                </List.Item>
                <List.Item>
                    Characters: {charsList.map((char, index) => {
                        return (
                            <Tooltip
                                key={index}
                                title={<div>
                                    <div>Name: {char.name}</div>
                                    <div>Birth Year: {char.birth_year}</div>
                                    <div>Eye Colour: {char.eye_color}</div>
                                    <div>Gender: {char.gender}</div>
                                    <div>Hair Colour: {char.hair_color}</div>
                                    </div>}>
                                <span >{char.name}, </span>
                            </Tooltip>
                        )
                    })}
                </List.Item>
                <List.Item>
                    Planets: {planetsList.map((planet, index) => {
                        return <span key={index}>{planet.name}, </span>
                    })}
                </List.Item>
                <List.Item>
                    Starships: {starshipsList.map((starship, index) => {
                        return <span key={index}>{starship.name}, </span>
                    })}
                </List.Item>
                <List.Item>
                    Vehicles: {vehiclesList.map((vehicle, index) => {
                        return <span key={index}>{vehicle.name}, </span>
                    })}
                </List.Item>
                <List.Item>
                    Species: {speciesList.map((specie, index) => {
                        return <span key={index}>{specie.name}, </span>
                    })}
                </List.Item>
            </List>
        </Card>
    )

}
export const getServerSideProps = async (context) => {
    let charsNum = []
    let planetsNum = []
    let starshipsNum = []
    let vehiclesNum = []
    let speciesNum = []
    const { params } = context
    const result = await fetch("https://swapi.dev/api/films").
        then(res => res.json())
    const currentMovie = result.results.find(movie => {
        return movie.episode_id === params.episode_id * 1
    })
    currentMovie.characters.map((char, index) => {
        const arr = char.split('/')
        charsNum.push(arr[5])
    })
    currentMovie.planets.map((planet, index) => {
        const arr = planet.split('/')
        planetsNum.push(arr[5])
    })
    currentMovie.starships.map((starship, index) => {
        const arr = starship.split('/')
        starshipsNum.push(arr[5])
    })
    currentMovie.vehicles.map((vehicle, index) => {
        const arr = vehicle.split('/')
        vehiclesNum.push(arr[5])
    })
    currentMovie.species.map((specie, index) => {
        const arr = specie.split('/')
        speciesNum.push(arr[5])
    })

    return {
        props: {
            episode_id: params.episode_id,
            currentMovie,
            charsNum,
            planetsNum,
            starshipsNum,
            vehiclesNum,
            speciesNum
        }
    }
}
export default connect(
    state => ({ reduxMovieList: state }),
    {
    }
)(Detail)

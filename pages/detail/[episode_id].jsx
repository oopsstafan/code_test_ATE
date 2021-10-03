import React from 'react'
import Link from 'next/link'
import { Card, List, Tooltip } from 'antd'
import {
    LeftOutlined
} from '@ant-design/icons'

import styles from '../../styles/Detail.module.scss'

function Detail({ setPageType, episode_id,
    currentMovie, charsNum, planetsNum, starshipsNum, vehiclesNum, speciesNum }) {
    const [charsList, setCharsList] = React.useState([])
    const [planetsList, setPlanetsList] = React.useState([])
    const [starshipsList, setStarshipsList] = React.useState([])
    const [vehiclesList, setVehiclesList] = React.useState([])
    const [speciesList, setSpeciesList] = React.useState([])
    React.useEffect(() => {
        setPageType("detail")

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

        <Card title={<Link href="/"><LeftOutlined /></Link>}>
            <List
                header={<div style={{fontSize: '180%', color: '#222222'}}>{currentMovie.title}</div>}

            >
                <List.Item>
                    <label className={styles.labelItem}>Episode ID : </label> <span className={styles.spanItem}>{currentMovie.episode_id}</span> 
                </List.Item>
                <List.Item>
                    <label className={styles.labelItem}>Opening Crawl : </label> <span className={styles.spanItem}>{currentMovie.opening_crawl}</span> 
                </List.Item>
                <List.Item>
                    <label className={styles.labelItem}>Director : </label> <span className={styles.spanItem}>{currentMovie.director}</span>
                </List.Item>
                <List.Item>
                    <label className={styles.labelItem}>Producer : </label> <span className={styles.spanItem}>{currentMovie.producer}</span>
                </List.Item>
                <List.Item>
                    <label className={styles.labelItem}>Release Date : </label> <span className={styles.spanItem}>{currentMovie.release_date}</span>
                </List.Item>
                <List.Item>
                    <label className={styles.labelItem}>Characters : </label> {charsList.map((char, index) => {
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
                                <span className={styles.spanItem}>{char.name}, </span>
                            </Tooltip>
                        )
                    })}
                </List.Item>
                <List.Item>
                    <label className={styles.labelItem}>Planets : </label> {planetsList.map((planet, index) => {
                        return <span key={index} className={styles.spanItem}>{planet.name}, </span>
                    })}
                </List.Item>
                <List.Item>
                    <label className={styles.labelItem}>Starships : </label> {starshipsList.map((starship, index) => {
                        return <span key={index} className={styles.spanItem}>{starship.name}, </span>
                    })}
                </List.Item>
                <List.Item>
                    <label className={styles.labelItem}>Vehicles : </label> {vehiclesList.map((vehicle, index) => {
                        return <span key={index} className={styles.spanItem}>{vehicle.name}, </span>
                    })}
                </List.Item>
                <List.Item>
                    <label className={styles.labelItem}>Species : </label> {speciesList.map((specie, index) => {
                        return <span key={index} className={styles.spanItem}>{specie.name}, </span>
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
export default Detail

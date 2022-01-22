import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { Search2Icon } from "@chakra-ui/icons";
import Logo from "../assets/images/weather.png";
import Cards from "./Cards";
import moment from "moment";
// import Chart from "./Chart";

const Pages: React.FC = () => {
  const MY_KEY = process.env.REACT_APP_WEATHER_KEY;
  const [search, setSearch] = React.useState("");
  const [city, setCity] = React.useState("Location");
  const [weatherData, setWeatherData] = React.useState<any>([]);
  const [forecastInfo, setForecastInfo] = React.useState<any>({
    forecast: [],
    date: "",
    x: [],
    y: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCurrentWeatherData(search);
  };

  const getCurrentWeatherData = async (location: string) => {
    setWeatherData([]);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${MY_KEY}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData({
        data: data,
        temperature: Math.floor(data.main.temp - 273.15),
        humidity: Math.floor(data.main.humidity),
        windSpeed: data.wind.speed.toFixed(2),
        timezone: data.timezone,
        icon: data.weather[0].icon,
        description: data.weather[0].main,
        pressure: data.main.pressure,
        date: new Date(data.dt * 1000).toString(),
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      });
      getForecastWeatherData(weatherData.latitude, weatherData.longitude);
      setCity(`${data.name}, ${data.sys.country}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getForecastWeatherData = async (lat: string, long: string) => {
    setForecastInfo([]);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${MY_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setForecastInfo({
        ...forecastInfo,
        data: data,
        forecast: data.daily.slice(1, 7),
        x: data.daily.map((t: any) => {
          return t.temp.day;
        }),
        y: data.daily.map((d: any) => {
          return moment.unix(d.dt).format("MMMM Do");
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     getCurrentWeatherData(search);
  //     }, [search]);

  return (
    <Box h="100vh" bg="#FFFFFF">
      <Flex>
        <Flex
          w="40%"
          h="100vh"
          bgColor="#0B0B45"
          px="30px"
          py="50px"
          flexDirection="column"
        >
          <Flex
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            mb="20"
          >
            <Flex>
              <Image src={Logo} alt="Logo" boxSize="45px" mr="2" />
              <Heading size="lg">FairWeather</Heading>
            </Flex>
          </Flex>

          <form onSubmit={handleSubmit}>
            <Flex flexDir="column" alignItems="center" mb="40px">
              <InputGroup w="70%" mb="6">
                <InputLeftElement children={<Search2Icon color="gray.300" />} />
                <Input
                  type="text"
                  value={search}
                  onChange={handleChange}
                  placeholder="Search new city"
                  bg="#FFFFFF"
                  sx={{
                    "::placeholder": {
                      color: "gray.300",
                    },
                    color: "#0B0B45",
                    fontWeight: "bold",
                  }}
                />
              </InputGroup>
              <Tooltip
                label="Click twice to get 7 days forecast"
                placement="top"
              >
                <Button type="submit" variantColor="teal" w="30%">
                  Submit
                </Button>
              </Tooltip>
            </Flex>
          </form>
          <Flex flexDir="column" alignItems="center" my="5">
            <Text fontSize="xl">{weatherData.date || "Time & Date"}</Text>
            <Text fontSize="2xl" mt="4">
              {city}
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Flex>
              <Text fontSize="8xl" fontWeight="500" textAlign="center" w="100%">
                {weatherData.temperature || 0}
              </Text>
              <Text fontSize="xl" mt="8">
                &deg;C
              </Text>
              <Image
                src={
                  "http://openweathermap.org/img/wn/" +
                  weatherData.icon +
                  "@2x.png"
                }
                ml="2"
                alt=""
              />
            </Flex>
            <Text fontSize="24px" textTransform="capitalize">
              {weatherData.description || "Description"}
            </Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            mt="20"
            w="60%"
            alignItems="center"
            mx="auto"
          >
            <Flex flexDir="column" alignItems="center">
              <Text fontSize="xl" mb="1">
                Humidity
              </Text>
              <Text>{weatherData.humidity || 0}%</Text>
            </Flex>
            <Flex flexDir="column" alignItems="center">
              <Text fontSize="xl" mb="1">
                Wind speed
              </Text>
              <Text>{weatherData.windSpeed || 0}km/j</Text>
            </Flex>
            <Flex flexDir="column" alignItems="center">
              <Text fontSize="xl" mb="1">
                Pressure
              </Text>
              <Text>{weatherData.pressure || 0}pa</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          w="60%"
          bg="#FBFBFF"
          flexDir="column"
          alignItems="center"
          px="30px"
          py="40px"
          h="100vh"
          justifyContent="space-between"
        >
          <Heading fontSize="4xl" color="#000000">
            Weather Forecast
          </Heading>
          {/* <Chart temp={weatherData.temperature} labels={weatherData.date}/> */}
          <Text my="10" fontSize="6xl" color="#000000">Chart not available</Text>
          <Flex maxW="100%" overflow="scroll" className="no-scroll-bar">
            {forecastInfo.forecast?.length > 0
              ? forecastInfo.forecast.map((d: any, index: number) => (
                  <Cards
                    key={index}
                    day={moment.unix(d.dt).format("MMMM Do")}
                    image={
                      "http://openweathermap.org/img/wn/" +
                      d.weather[0].icon +
                      "@2x.png"
                    }
                    humidity={d.humidity}
                  />
                ))
              : ""}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
export default Pages;

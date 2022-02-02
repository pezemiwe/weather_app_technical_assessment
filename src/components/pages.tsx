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
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryLabel } from "victory";

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

  // useEffect(() => {
  // }, [weatherData]);

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
          justifyContent="space-between"
        >
          <Flex
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            mb="40px"
          >
            <Flex>
              <Image src={Logo} alt="Logo" boxSize="45px" mr="4px" />
              <Heading size="lg" color="#FFFFFF">
                FairWeather
              </Heading>
            </Flex>
          </Flex>

          <form onSubmit={handleSubmit}>
            <Flex flexDir="column" alignItems="center">
              <InputGroup w="70%" mb="15px">
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
          <Flex flexDir="column" alignItems="center" color="#FFFFFF">
            <Text fontSize="sm">{weatherData.date || "Time & Date"}</Text>
            <Text fontSize="lg" mt="px">
              {city}
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Flex>
              <Text
                fontSize="8xl"
                fontWeight="500"
                textAlign="center"
                w="100%"
                color="#FFFFFF"
              >
                {weatherData.temperature || 0}
              </Text>
              <Text fontSize="xl" mt="20px" color="#FFFFFF">
                &deg;C
              </Text>
              <Image
                src={
                  "http://openweathermap.org/img/wn/" +
                  weatherData.icon +
                  "@2x.png"
                }
                ml="2px"
                alt=""
              />
            </Flex>
            <Text fontSize="24px" textTransform="capitalize" color="#FFFFFF">
              {weatherData.description || "Description"}
            </Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            mt="20px"
            w="100%"
            alignItems="center"
            mx="auto"
            color="#FFFFFF"
          >
            <Flex flexDir="column" alignItems="center">
              <Text fontSize="xl" mb="1px">
                Humidity
              </Text>
              <Text>{weatherData.humidity || 0}%</Text>
            </Flex>
            <Flex flexDir="column" alignItems="center">
              <Text fontSize="xl" mb="1px">
                Wind speed
              </Text>
              <Text>{weatherData.windSpeed || 0}km/j</Text>
            </Flex>
            <Flex flexDir="column" alignItems="center">
              <Text fontSize="xl" mb="px">
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
          py="20px"
          h="100vh"
          justifyContent="space-between"
        >
          <Heading fontSize="4xl" color="#000000">
            Weather Forecast
          </Heading>
          <Flex
            w="90%"
            h="48vh"
            flexDir="column"
            color="#0B0B45"
            justifyContent="center"
            alignItems="center"
            mb="6"
          >
            <VictoryChart theme={VictoryTheme.material} width={600}>
              <VictoryAxis
                tickValues={forecastInfo.y}
                style={{
                  tickLabels: { fontSize: 10, padding: 5 },
                  axisLabel: { padding: 30 },
                }}
              />
              <VictoryAxis
            
                dependentAxis
                tickValues={forecastInfo.x}
                tickFormat={(t: any) => t + "°C"}
                label="Temperature (&deg;C)"
                axisLabelComponent={<VictoryLabel dy={-45} />}
              
                style={{
                  tickLabels: { fontSize: 10, padding: 5, fontWeight: "bold", color: "#0B0B45",  },
                  ticks: { stroke: "#0B0B45", size: 5, strokeWidth: 2, strokeOpacity: 0.5, },
                }}
                fixLabelOverlap={true}
              
                />
              <VictoryLine
                data={forecastInfo.x}
                style={{
                  data: { stroke: "#0B0B45", strokeWidth: 2 },
                }}
              />
            </VictoryChart>
          <Text fontWeight="bold">Seven(7) days forecast of temperature (&deg;C) represented in a line graph </Text>
          </Flex>
          <Flex
            maxW="100%"
            overflow="scroll"
            h="270px"
            className="no-scroll-bar"
          >
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

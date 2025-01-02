# Real-Time Disaster Monitoring for India

### Link to the deployed project: <a href = "https://disaster-management-india.web.app/">Real-Time Disaster Monitoring Dashboard</a>
<em>Project structure has been explained below, as well as some points to keep in mind when using the disaster monitoring dashboard. Please check before using.</em>

This project has been built in order to help users monitor the various natural disasters occurring in India.

### Project Images  

<img src="https://github.com/user-attachments/assets/a163f8c9-bbc0-4fad-a8a8-482c45b6ba2d" width="500"/>

<img src="https://github.com/user-attachments/assets/4f6faea4-f079-482d-bba1-029b6cc7d24d" width="500"/>

<img src="https://github.com/user-attachments/assets/48466973-37d0-41e4-b1e7-013ca3ff6315" width="500"/>

<img src="https://github.com/user-attachments/assets/ca59a2ce-49a7-41df-9f03-b1616add61dc" width="500"/>

### Project Structure

#### General Overview Section:
- Uses the ReliefWeb API to return the total and ongoing disasters in India
- OpenStreetMap (OSM) API returns the total number of hospitals near disaster-prone zones and schools vulnerable to disaster
- The NDMA budget reference can be checked in <a href = "https://www.indiabudget.gov.in/doc/eb/allsbe.pdf">this document provided by the Government of India</a>

#### Help Out Section:
- Uses the ReliefWeb API to return the jobs available in India to provide assistance to disaster victims
- Received data is formatted to suit the user's needs in terms of dates, time and responsiveness

#### The Map Section:
- Uses React Leaflet, which serves as a wrapper over Leaflet maps, to display the map
- Disaster-prone zones' geocoding and retrieval is both done using the OSM API
- <b>In case the nearest hospitals aren't retrieved</b> fast enough, it is probably due to API latency problems, possibly due to too many or too few hospitals near that particular area
- Disaster-prone zones have been identified manually due to absence of relevant API's to do the task

#### Heatwave Predictor and Storm Predictor Tools:
- Geocoding and weather data retrieved through OpenWeather API
- The API free tier has a usage cap, if the tool is <b>not returning the required data</b>, then it is possibly due to:
  - The free-tier API latency
  - The free-tier API usage cap (might have been blown by bad state actors)
  - Cap on free-tier server hosting at Render (which is where the backend is deployed for this project)
- You can review the methodology used to predict the output by clicking on "citations"

#### AI Damage Assessor
- Transfer-learning applied on the VGG16 model with 90% accuracy
- Datasets sourced from Kaggle and cleaned, augmented and processed manually in order to prevent high variance or high bias in model
- The uploaded image is classified as earthquake damage, fire damage, injured human, infrastructure damage, landslide damage, water disaster, healthy human, undamaged infrastructure, aquatic landscape
- Keep in mind that certain uploaded images may display more than one type of damage, in which case the model defaults to the more prevalent damage solvable
- Resources to mitigate/report/manage the damage are linked in the Damage Analysis Model
- Emergency contacts for India listed in the Damage Analysis Model

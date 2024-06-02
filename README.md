# Cloud Connected Light Sensor #

### Team 7 - Noot Noot ###

* Kayla Wang - Team Leader/Hardware Developer
* Euan Rix - Full-stack Developer
* Hamzah Patel - Front-end Developer
* Sophia Black - Front-end Developer
* Ju-an Bautista - Back-end Developer
* Juan Santos - Back-end Developer

### Project Management Tool ###

[GitHub Projects](https://github.com/orgs/uoa-compsci399-s1-2024/projects/13)
  
# About Our Project #

### Executive Summary ###

Eyesight is an essential need for virtually every human. From Doctors to Athletes to the average Joe, and everyone in between, sight is utilised in a wide variety of ways. Thus, there is a significant need for people to be able to protect their eyesight against harmful influences, such as Myopia. Myopia, or nearsightedness, is a vision issue often observed in children and teenagers between the ages of 8 and 12. Gained either hereditarily or induced by external influence, Myopia can affect more than your eyesight negatively. Inducing Headaches or Tiredness, this combination of symptoms associated with Myopia is guaranteed to hinder anyone's daily life. By 2050, it is projected that 50% of the world's population will be affected by Myopia. An influence hypothesised to have reinforced this trend is an increase in time spent indoors, and combatting this influence was the intended goal our clients presented to us. SightSaver has created a way for parents to monitor and increase the amount of time their child spends outdoors, a solution to tackle Myopia's manifestation in children and teens. We are also considering our client's request to retrieve better (and ethically sourced) data for researchers in the field of Optometry, such as themselves. SightSaver is a fully operational mobile application (with web service functionality) that aims to spur children toward achieving a daily goal of time spent outside. In this app, parents can analyse their children's daily, weekly, and even yearly outdoor activity with data received from a piece of hardware we assembled ourselves. Similar to a fitness tracker, we believe that setting a goal and visualising the progress toward set goal will encourage users to get outside and significantly reduce their risk of having Myopia. Built on React Native and Java, SightSaver is an application that is both pleasant to walk through and successful in achieving the goal it was designed for. The SightSaver team wholeheartedly believes that we have created a tool that will prove effective in the future generations' battle against Myopia.

### Technologies Used To Develop Our Project ###
* Front-end - React Native (Expo SDK v49)
* Back-end - Java Spring-boot
* Database - SQL
* Hosting Service - Microsoft Azure
* Hardware - Raspberry Pi 5

# Setup Instructions #

_Instructions below are designed ONLY for Windows OS machines running at least Windows 7, an Android device or Emulator running at least Android v11, and a Raspberry Pi 5_

## Prerequisites ##

1. Clone or Download our Repo (Ensure it has a short file path from root)
	- https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-7-noot-noot
2. Open a terminal in the capstone directory and run:
	- ```cd SightSaver```
	- ```npm install```  
3. Ensure java JDK 17 is installed (Visit link to download)
	- https://www.oracle.com/nz/java/technologies/downloads/#java17
4. Once JDK is downloaded, set environment config of JAVA_HOME to point to JDK 17 file:
	- From desktop open Windows Start Menu
	- Search Environment Variables
	- On system variables, click New
	- In the variable name field enter `JAVA_HOME`
	- In the variable value field enter the installation path of your JDK (eg: C:\Program Files\...)
	- Click OK and Apply changes

**To setup the SightSaver App, you have two options:**
1. Use an Android Emulator
2. Use a Physical Android Device

_If you're wanting to run the app on the Local Server (Recommended for development and testing):_

* Change the API_URL in ctx.tsx from https://sightsaver-api.azurewebsites.net/api to http://{youre ip}:{port number of local server}/api

## Instructions for setting up Android Emulator ##

[Android Emulator Setup Instructions](https://reactnative.dev/docs/set-up-your-environment)

## Instructions for Setting up the App on a Physical Device ##

1. Head to [Expo](expo.dev) on your Phone and sign in using the account details
	- Username: SightSaverDeveloper
 	- Password: Team7nootnoot
2. Once you're logged in, open up the side bar
	- Open the account dropdown
 	- Select the SightSaver Organisation
3. On the dashboard, select the newest Android build
	- Under the section 'Build APK', press the install button
4. Once the APK is installed, in your browser, open the APK to unpack it
   	- You're ready to go!

## Instructions for setting up the JAVA Spring-boot Server [Optional] ##

1. Download the lastest version of maven (mvn)
	- https://maven.apache.org/download.cgi
	- From the site above install `the Link Binary Zip Archive` of mvn

2. Once mvn is downloaded, set environment config of MAVEN_HOME:
	- From desktop open Windows Start Menu
	- Search Environment Variables
	- On system variables, click New
	- In the variable name field enter `MAVEN_HOME`
	- In the variable value field enter the installation path of your mvn folder (eg: C:\Program\Files\Maven\...)
	- Click OK
	- Under system variables, click on the `Path` variable and edit it
	- Click New
	- Enter `%MAVEN_HOME%\bin` in the new field
	- Click OK and Apply changes

3. Verify mvn version and installation on windows PC
	- Open command prompt
	- Type `mvn -version` (Result should output the maven version and java version being used)
	- If failure above double check system variable of JDK and MAVEN (Or perhaps command prompt needs a refresh)

4. Once Java JDK and MAVEN has been installed and set up on the system, clone the backend repository from github
	- https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-7-noot-noot
	- `git clone` ...

5. Navigate to backend code
	- `cd Backend_API - NootNoot`

6. Run the mvn build to install and set up pom.xml file
	- `mvn clean install -U`
	- Should return a build success message

# Build Instructions #
Open a terminal in the capstone directory and run: 
```
cd SightSaver
npx expo start
```

1. On a Physical Android Device
	- Ensure you have the APK installed
 	- Open the SightSaver APK 
 	- In the terminal you just ran ```npx expo start```
  		- Find the ip address and port number e.g. 192.0.2.146:8081
    	- Enter that ip address with the port number in that format into the SightSaver APK
2. On the Android Emulator
	- Ensure you have the Android Emulator running
 	- In the terminal you just ran ```npx expo start```
  		- Press 'a' to open the app on the emulator

## Running the App on the Local Server ## 
Open a terminal in the capstone directory and run: 
```
cd Backend_API - NootNoot
mvn spring-boot:run
```

1. Ensure you have changed the API_URL in ctx.tsx

# Usage Examples #



# Website URL #

https://thankful-sea-02b4f450f.5.azurestaticapps.net

# Future Plans #

**Wearability:**

Our vision for this project is to make a seamless wearable device that children can easily put on and enjoy their day in the sun. While our prototype is portable, it currently requires a power bank, and the Raspberry Pi and breadboard are too large to be wearable devices. Therefore, by achieving portability, our team envisions achieving wearability in the future with further development. Wearability can be achieved by using a smaller power source and microcontroller and gaining access to a 3D printer to create a small case for the wires. 

**Gamification:**

The main users of our product are parents and children. Therefore, implementing gamification elements into our app can significantly enhance user experience and usability. By taking inspiration from popular existing apps such as Forest, Apple Fitness+ and Duolingo, our app can be enhanced in the future by turning the lux exposure levels into different goals each day. By achieving certain goals, users can earn points to spend in a digital ‘shop’ to grow a tree or customise their personal sun. This fun feature can encourage parents and kids to consistently use and monitor their light exposure. 

**Health Application Integration:**

Our Cloud Connect Light Monitor project can be enhanced by integrating our platform with popular health apps such as Apple Health, Fitbit and Samsung Health. Users can view their overall health comprehensively by syncing light exposure data with the health app. Enabling the light exposure data to other health metrics, such as sleep patterns and physical activity, can repurpose the light monitor’s data to illustrate how light exposure can affect physical performance and sleep quality instead of solely focusing on myopia. This idea has the potential to foster healthier lifestyles and increase the usability of the device and platform itself. 

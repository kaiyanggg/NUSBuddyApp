import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import CoursesScreen from "./CoursesScreen";
import ResidencesScreen from "./ResidencesScreen";
import ProfileScreen from "./ProfileScreen";
import CalendarScreen from "./CalendarScreen";
import LoginScreen from "./LoginScreen";
import OnboardingScreen from "./OnboardingScreen";
import EditProfileScreen from "./EditProfileScreen";
import SearchScreen from "./SearchScreen";
import FYPScreen from "./FYPScreen";
import EventScreen from "./EventScreen";
import AddEventScreen from "./AddEventScreen";
import ChatScreen from "./ChatScreen";

import LawScreen from "../screens/coursesscreens/LawScreen";
import BusinessScreen from "./coursesscreens/BusinessScreen";
import CDEScreen from "./coursesscreens/CDEScreen";
import CHSScreen from "./coursesscreens/CHSScreen";
import MedicineScreen from "./coursesscreens/MedicineScreen";
import SOCScreen from "./coursesscreens/SOCScreen";
import DentistryScreen from "./coursesscreens/DentistryScreen";
import ArchiScreen from "./coursesscreens/CDEScreens/ArchiScreen";
import IDScreen from "./coursesscreens/CDEScreens/IDScreen";
import EnginScreen from "./coursesscreens/CDEScreens/EnginScreen";
import LandscapeArchiScreen from "./coursesscreens/CDEScreens/LandscapeArchiScreen";
import CSScreen from "./coursesscreens/SOCScreens/CSScreen";
import BZAScreen from "./coursesscreens/SOCScreens/BZAScreen";
import InfoSysScreen from "./coursesscreens/SOCScreens/InfoSysScreen";
import InfoSecScreen from "./coursesscreens/SOCScreens/InfoSecScreen";
import CEScreen from "./coursesscreens/SOCScreens/CEScreen";
import REScreen from "./coursesscreens/BusinessScreens/REScreen";
import AccScreen from "./coursesscreens/BusinessScreens/AccScreen";
import BizScreen from "./coursesscreens/BusinessScreens/BizScreen";
import DSEScreen from "./coursesscreens/CHSScreens/DSEScreen";
import EnvStudiesScreen from "./coursesscreens/CHSScreens/EnvStudiesScreen";
import FSTScreen from "./coursesscreens/CHSScreens/FSTScreen";
import HSScreen from "./coursesscreens/CHSScreens/HSScreen";
import PharmSciScreen from "./coursesscreens/CHSScreens/PharmSciScreen";
import PharmScreen from "./coursesscreens/CHSScreens/PharmScreen";
import MedScreen from "./coursesscreens/MedicineScreens/MedScreen";
import NursingScreen from "./coursesscreens/MedicineScreens/NursingScreen";
import PPEScreen from "./coursesscreens/CHSScreens/PPEScreen";

import HallScreen from "./residencesscreens/HallScreen";
import RCScreen from "./residencesscreens/RCScreen";
import SRScreen from "./residencesscreens/SRScreen";
import HousesScreen from "./residencesscreens/HousesScreen";
import EHScreen from "./residencesscreens/HallScreens/EHScreen";
import THScreen from "./residencesscreens/HallScreens/THScreen";
import KE7Screen from "./residencesscreens/HallScreens/KE7Screen";
import SHScreen from "./residencesscreens/HallScreens/SHScreen";
import KRScreen from "./residencesscreens/HallScreens/KRScreen";
import RHScreen from "./residencesscreens/HallScreens/RHScreen";
import RVRCScreen from "./residencesscreens/RCScreens/RVRCScreen";
import RC4Screen from "./residencesscreens/RCScreens/RC4Screen";
import CAPTScreen from "./residencesscreens/RCScreens/CAPTScreen";
import TembusuScreen from "./residencesscreens/RCScreens/TembusuScreen";
import PGPScreen from "./residencesscreens/SRScreens/PGPScreen";
import UTRScreen from "./residencesscreens/SRScreens/UTRScreen";
import PioneerScreen from "./residencesscreens/HousesScreens/PioneerScreen";
import LighthouseScreen from "./residencesscreens/HousesScreens/LighthouseScreen";
import HelixScreen from "./residencesscreens/HousesScreens/HelixScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Courses" component={CoursesScreen} />
          <Stack.Screen name="Residences" component={ResidencesScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="For You" component={FYPScreen} />
          <Stack.Screen name="Event" component={EventScreen} />
          <Stack.Screen name="Add Event" component={AddEventScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Faculty of Law" component={LawScreen} />
          <Stack.Screen name="Law" component={LawScreen} />
          <Stack.Screen name="School of Medicine" component={MedicineScreen} />
          <Stack.Screen name="Nursing" component={NursingScreen} />
          <Stack.Screen name="Medicine" component={MedScreen} />
          <Stack.Screen name="School of Computing" component={SOCScreen} />
          <Stack.Screen
            name="Faculty of Dentistry"
            component={DentistryScreen}
          />
          <Stack.Screen name="Dentistry" component={DentistryScreen} />
          <Stack.Screen
            name="College of Humanities and Sciences"
            component={CHSScreen}
          />
          <Stack.Screen
            name="College of Design and Engineering"
            component={CDEScreen}
          />
          <Stack.Screen name="NUS Business School" component={BusinessScreen} />
          <Stack.Screen name="Architecture" component={ArchiScreen} />
          <Stack.Screen name="Industrial Design" component={IDScreen} />
          <Stack.Screen name="Engineering" component={EnginScreen} />
          <Stack.Screen
            name="Landscape Architecture"
            component={LandscapeArchiScreen}
          />
          <Stack.Screen name="Computer Engineering" component={CEScreen} />
          <Stack.Screen name="Computer Science" component={CSScreen} />
          <Stack.Screen name="Business Analytics" component={BZAScreen} />
          <Stack.Screen name="Information Security" component={InfoSecScreen} />
          <Stack.Screen name="Information Systems" component={InfoSysScreen} />
          <Stack.Screen name="Business Administration" component={BizScreen} />
          <Stack.Screen
            name="Business Administration (Accountancy)"
            component={AccScreen}
          />
          <Stack.Screen name="Real Estate" component={REScreen} />
          <Stack.Screen
            name="Data Science and Economics"
            component={DSEScreen}
          />
          <Stack.Screen
            name="Environmental Studies"
            component={EnvStudiesScreen}
          />
          <Stack.Screen
            name="Food Science and Technology"
            component={FSTScreen}
          />
          <Stack.Screen name="Humanities and Sciences" component={HSScreen} />
          <Stack.Screen
            name="Pharmaceutical Science"
            component={PharmSciScreen}
          />
          <Stack.Screen name="Pharmacy" component={PharmScreen} />
          <Stack.Screen
            name="Philosophy, Politics, and Economics"
            component={PPEScreen}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Halls of Residence" component={HallScreen} />
          <Stack.Screen name="Residential College" component={RCScreen} />
          <Stack.Screen name="Houses" component={HousesScreen} />
          <Stack.Screen name="Student Residences" component={SRScreen} />
          <Stack.Screen name="Eusoff Hall" component={EHScreen} />
          <Stack.Screen name="Temasek Hall" component={THScreen} />
          <Stack.Screen name="Raffles Hall" component={RHScreen} />
          <Stack.Screen name="Sheares Hall" component={SHScreen} />
          <Stack.Screen name="Kent Ridge Hall" component={KRScreen} />
          <Stack.Screen name="King Edward VII Hall" component={KE7Screen} />
          <Stack.Screen name="RVRC" component={RVRCScreen} />
          <Stack.Screen name="RC4" component={RC4Screen} />
          <Stack.Screen name="Tembusu College" component={TembusuScreen} />
          <Stack.Screen name="CAPT" component={CAPTScreen} />
          <Stack.Screen name="PGP" component={PGPScreen} />
          <Stack.Screen name="Utown Residences" component={UTRScreen} />
          <Stack.Screen name="Helix House" component={HelixScreen} />
          <Stack.Screen name="Lighthouse" component={LighthouseScreen} />
          <Stack.Screen name="Pioneer House" component={PioneerScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

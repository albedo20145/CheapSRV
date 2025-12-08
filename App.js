import React from "react";
import {
  SafeAreaView, View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity, Linking, Alert
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import servicesData from "./data/services.json";
import { AdMobBanner } from "expo-ads-admob";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const categories = Object.keys(servicesData);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CheapSRV — Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(i)=>i}
        numColumns={2}
        contentContainerStyle={{paddingBottom:20}}
        renderItem={({item})=>(
          <Pressable onPress={()=>navigation.navigate("Services",{category:item})} style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
          </Pressable>
        )}
      />
      <View style={{alignItems:"center", marginTop:8}}>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          servePersonalizedAds
          onDidFailToReceiveAdWithError={(e)=>console.log(e)}
        />
      </View>
    </SafeAreaView>
  );
}

function ServicesScreen({ route, navigation }) {
  const { category } = route.params;
  const list = servicesData[category] || [];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={list}
        keyExtractor={(i)=>i.id}
        renderItem={({item})=>(
          <Pressable style={styles.serviceCard} onPress={()=>navigation.navigate("Detail",{item})}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>{item.price} {item.tag?` • ${item.tag}`:""}</Text>
            {item.guarantee && <Text style={styles.small}>Guarantee: {item.guarantee}</Text>}
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

function DetailScreen({ route }) {
  const { item } = route.params;
  const openWebsite = async () => {
    const url = item.websiteUrl || "https://yourwebsite.example";
    try{
      const supported = await Linking.canOpenURL(url);
      if(supported) Linking.openURL(url);
      else Alert.alert("Cannot open link");
    } catch(e){
      Alert.alert("Error opening link");
    }
  };

  const openWhatsApp = () => {
    const phone = "919999999999"; // replace with your support number (country code + number)
    const text = encodeURIComponent("Hi, I need help with CheapSRV regarding: "+item.name);
    const url = `https://wa.me/${phone}?text=${text}`;
    Linking.openURL(url).catch(()=>Alert.alert("WhatsApp not available"));
  };

  const openGmail = () => {
    const email = "support@cheapsrv.com";
    const subject = encodeURIComponent("CheapSRV Support: "+item.name);
    const body = encodeURIComponent("Hello, I need help regarding "+item.name);
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(url).catch(()=>Alert.alert("No mail client"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.detailBox}>
        <Text style={styles.priceLarge}>{item.price}</Text>
        {item.tag && <Text style={styles.small}>{item.tag}</Text>}
        {item.note && <Text style={styles.small}>{item.note}</Text>}
        {item.guarantee && <Text style={styles.small}>Guarantee: {item.guarantee}</Text>}

        <TouchableOpacity style={styles.primaryBtn} onPress={openWebsite}>
          <Text style={{color:"#fff", fontWeight:"700"}}>Open Provider Website</Text>
        </TouchableOpacity>

        <View style={{flexDirection:"row", marginTop:12, justifyContent:"space-between"}}>
          <TouchableOpacity style={styles.contactBtn} onPress={openWhatsApp}>
            <Text style={{color:"#fff"}}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactBtn} onPress={openGmail}>
            <Text style={{color:"#fff"}}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title:"CheapSRV"}}/>
        <Stack.Screen name="Services" component={ServicesScreen} options={({route})=>({title:route.params.category})}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{title:"Service Details"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:12, backgroundColor:"#061126"},
  title:{fontSize:20, fontWeight:"700", color:"#fff", marginBottom:10},
  card:{flex:1, margin:8, minHeight:100, borderRadius:10, backgroundColor:"#0b1b3f", alignItems:"center", justifyContent:"center"},
  cardText:{color:"#fff", fontSize:16, fontWeight:"700"},
  serviceCard:{marginVertical:8, padding:12, borderRadius:8, backgroundColor:"#07203a"},
  serviceName:{color:"#fff", fontSize:16, fontWeight:"700"},
  servicePrice:{color:"#00e5ff", marginTop:6, fontWeight:"700"},
  small:{color:"#cbd5e1", marginTop:4},
  detailBox:{marginTop:12, padding:12, backgroundColor:"#071526", borderRadius:8},
  priceLarge:{color:"#00ffd5", fontSize:30, fontWeight:"800"},
  primaryBtn:{marginTop:14, backgroundColor:"#00b8f2", padding:12, borderRadius:8, alignItems:"center"},
  contactBtn:{backgroundColor:"#25D366", padding:10, borderRadius:8, width:"48%", alignItems:"center"}
});

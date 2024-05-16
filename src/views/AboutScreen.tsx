import { Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";


export default function AboutScreen() {
    const navigation = useNavigation();

  return (
    
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.text}>
        About App
      </Text>

      <Text style={styles.text}>
        Creators: {"\n"}{"\n"}

        Nicolás Castañeda{"\n"}
        Carlos Bello
      </Text>
      
      <Text style={styles.text2}>
      This is a purely academic project and will not be distributed or used for profit or commercialization.
      </Text>
      
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{ width: "100%" }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#C674F1", "#F22E7A"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Back</Text>
        </LinearGradient>
      </TouchableOpacity>
      
     

       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 90,
    backgroundColor: "#000932",
  },
  logo: {
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    marginBottom: 50,
  },
  text2: {
    textAlign: "justify",
    fontWeight: "light",
    color: "white",
    fontSize: 15,
    marginBottom: 50,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

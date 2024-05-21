import { View, Text, StyleSheet,ScrollView } from "react-native";
import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import { AppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  const { perfil, setPerfil } = useContext(AppContext)
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#4B9EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '30%', borderRadius: 20 }}
      />

      <View style={{ marginTop: 260 }}></View>
      <View style={{position: "absolute"}}>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 23,marginTop: 100, marginLeft: 17, width: 400}}>Hi, {perfil.nombre}!</Text>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 23,marginTop:3, marginLeft: 17, width: 250}}>Start a new challenge or continue one you have already started</Text>
      </View>
      <View style={{marginHorizontal: "5%"}}>
        <ScrollView style={{height: "60%"}}>
          <Text style={styles.title}>Continue...</Text>
          <View style={{flexDirection: "row"}}>
            <View style={styles.activity_placeholder}>
              <LinearGradient
                colors={['#C674F1', '#F22E7A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: -1 }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 20 }}
              />
              <Text style={styles.desc_placeholder}>Equations</Text>
              <Text style={styles.desc_placeholder}>57%</Text>
            </View>
            <Text style={styles.difficulty_placeholder}>med. 2.9/5</Text>
          </View>
          <Text style={styles.title}>New Challenges</Text>
          <View style={{flexDirection: "row"}}>
            <View style={styles.activity_placeholder}>
              <LinearGradient
                colors={['#000932', '#00C2FF']}
                start={{ x: -1.2, y: -0.5 }}
                end={{ x: 1, y: -1 }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 20 }}
              />
              <Text style={styles.desc_placeholder}>Complete the</Text>
              <Text style={styles.desc_placeholder}>equation</Text>
            </View>
            <Text style={styles.difficulty_placeholder}>med. 2.2/5</Text>
          </View>
          <View style={{flexDirection: "row"}}>
            <View style={styles.activity_placeholder}>
              <LinearGradient
                colors={['#000932', '#00C2FF']}
                start={{ x: -1.2, y: -0.5 }}
                end={{ x: 1, y: -1 }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 20 }}
              />
              <Text style={styles.desc_placeholder}>Graphics &</Text>
              <Text style={styles.desc_placeholder}>Functions</Text>
            </View>
            <Text style={styles.difficulty_placeholder}>med. 4/5</Text>
          </View>
          <View style={{flexDirection: "row"}}>
            <View style={styles.activity_placeholder}>
              <LinearGradient
                colors={['#000932', '#00C2FF']}
                start={{ x: -1.2, y: -0.5 }}
                end={{ x: 1, y: -1 }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 20 }}
              />
              <Text style={styles.desc_placeholder}>Diferential</Text>
              <Text style={styles.desc_placeholder}>Functions</Text>
            </View>
            <Text style={styles.difficulty_placeholder}>med. 4.5/5</Text>
          </View>
        </ScrollView>
        <View style={styles.activity_placeholder} />
      </View>
      <View style={styles.navbar}><NavBar /></View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: 'white',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8
  },
  title: {
    fontWeight: "bold",
    fontSize: 21
  },
  activity_placeholder: {
    marginVertical: 10,
    height: 100,
    width: 250,
    alignContent: "center",
    justifyContent: "center"
  },
  difficulty_placeholder: {
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 26,
    width: 65
  },
  desc_placeholder: {
    alignSelf: 'center',
    color: "white",
    fontWeight: "bold",
    fontSize: 27,
  }
})
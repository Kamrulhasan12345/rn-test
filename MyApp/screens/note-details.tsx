import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

type RootStackParamList = {
  NotesList: undefined;
  NoteDetail: { id: number };
};

type NoteDetailRouteProp = RouteProp<RootStackParamList, "NoteDetail">;

export default function NoteDetails({ route }: { route: NoteDetailRouteProp }) {
  const { id } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note Detail</Text>
      <Text>Showing details for note with id: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
});
import { useNavigation } from "@react-navigation/native"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { NoteDetailNavigationProp } from "../App"

export type Item = {
  id: number
  title: string
  description: string
  tags: string[]
}

export default function Card({ item }: { item: Item }) {
  const navigation = useNavigation<NoteDetailNavigationProp>();

  return <Pressable
    style={styles.card}
    onPress={() => navigation.navigate("NoteDetail", { id: item.id })}
  >
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
    <View style={styles.tagContainer}>
      {item.tags.map((v, i) =>
        <Text key={i} style={styles.tag}>{v}</Text>
      )}
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 6,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: "gray",
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
    fontSize: 12,
  },
});
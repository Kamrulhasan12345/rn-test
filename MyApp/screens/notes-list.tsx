import { FlatList } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { items } from "../constants";
import Card, { Item } from "../ui/card";
import { useEffect, useState } from "react";
import { Note, getAllNotes } from "../notes-store";
import { storage } from "../storage";

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const listener = storage.addOnValueChangedListener(() => {
      setNotes(getAllNotes());
    });
    return () => listener.remove();
  }, []);

  return <MasonryList
    data={items}
    keyExtractor={(item) => item.id.toString()}
    numColumns={2}
    renderItem={({ item, i }) => <Card key={i} item={item as Item} />}
  />
}
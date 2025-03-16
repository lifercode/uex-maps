/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useMap } from "../../hooks/use-map";
import { useContacts } from "../../hooks/use-contacts";
import { Contact } from "../../types";
import { EditContactDialog } from "../dialog/edit-contact-dialog";
import { MapMarker } from "./map-marker";

export function MapProvider() {
  const { contacts, selectedContact } = useContacts();
  const { flyTo, mapContainerRef, isMapLoaded, mapRefCurrent } = useMap()
  const [open, setOpen] = useState<Contact | null>(null)

  useEffect(() => {
    if(selectedContact) {
      flyTo(selectedContact.coordinates)
    }
  }, [selectedContact])

  return (
    <>
      <div
        id="map-container"
        className="w-full h-full"
        ref={mapContainerRef}
      />

      {isMapLoaded && contacts && contacts.map((item) => (
        <MapMarker
          key={item.id}
          data={item}
          map={mapRefCurrent}
          onClick={() => setOpen(item)}
          isSelected={selectedContact?.id === item.id}
        />
      ))}

      <EditContactDialog
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        data={open}
      />
    </>
  )
}

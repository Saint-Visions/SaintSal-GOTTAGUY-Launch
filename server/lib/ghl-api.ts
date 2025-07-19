/**
 * GoHighLevel API utilities for outgoing calls and AI-driven actions
 * Implements the server-side helper functions for CRM integration
 */

const GHL_API_BASE = "https://rest.gohighlevel.com/v1";
const GHL_API_V2_BASE = "https://services.leadconnectorhq.com";

// GHL API Headers
const getGhlHeaders = (locationId?: string) => ({
  Authorization: `Bearer ${process.env.GHL_API_KEY}`,
  "Content-Type": "application/json",
  Version: "2021-07-28",
  ...(locationId && { "Location-Id": locationId }),
});

// Contact Management
export async function createGhlContact(contactData: {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  locationId: string;
  source?: string;
  tags?: string[];
}) {
  try {
    console.log("🔗 Creating GHL contact:", contactData);

    const response = await fetch(`${GHL_API_V2_BASE}/contacts/`, {
      method: "POST",
      headers: getGhlHeaders(contactData.locationId),
      body: JSON.stringify({
        firstName: contactData.firstName,
        lastName: contactData.lastName || "",
        email: contactData.email || "",
        phone: contactData.phone || "",
        source: contactData.source || "saintvisionai_platform",
        tags: contactData.tags || [],
        customFields: {
          platform_source: "SaintVisionAI Dual-AI Platform",
          created_via: "AI Assistant",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ GHL contact created:", result);
    return result;
  } catch (error) {
    console.error("❌ Error creating GHL contact:", error);
    throw error;
  }
}

export async function updateGhlContact(
  contactId: string,
  updateData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    locationId: string;
    tags?: string[];
  },
) {
  try {
    console.log("📝 Updating GHL contact:", contactId, updateData);

    const response = await fetch(`${GHL_API_V2_BASE}/contacts/${contactId}`, {
      method: "PUT",
      headers: getGhlHeaders(updateData.locationId),
      body: JSON.stringify({
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        email: updateData.email,
        phone: updateData.phone,
        tags: updateData.tags,
        customFields: {
          last_updated_via: "SaintVisionAI AI Assistant",
          last_updated_at: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ GHL contact updated:", result);
    return result;
  } catch (error) {
    console.error("❌ Error updating GHL contact:", error);
    throw error;
  }
}

export async function getGhlContact(contactId: string, locationId: string) {
  try {
    const response = await fetch(`${GHL_API_V2_BASE}/contacts/${contactId}`, {
      method: "GET",
      headers: getGhlHeaders(locationId),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error fetching GHL contact:", error);
    throw error;
  }
}

// Opportunity Management
export async function createGhlOpportunity(opportunityData: {
  name: string;
  pipelineId: string;
  stageId: string;
  contactId: string;
  locationId: string;
  monetaryValue?: number;
  notes?: string;
}) {
  try {
    console.log("💰 Creating GHL opportunity:", opportunityData);

    const response = await fetch(`${GHL_API_V2_BASE}/opportunities/`, {
      method: "POST",
      headers: getGhlHeaders(opportunityData.locationId),
      body: JSON.stringify({
        pipelineId: opportunityData.pipelineId,
        locationId: opportunityData.locationId,
        name: opportunityData.name,
        stageId: opportunityData.stageId,
        status: "open",
        contactId: opportunityData.contactId,
        monetaryValue: opportunityData.monetaryValue || 0,
        notes:
          opportunityData.notes || "Created via SaintVisionAI AI Assistant",
        source: "saintvisionai_platform",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ GHL opportunity created:", result);
    return result;
  } catch (error) {
    console.error("❌ Error creating GHL opportunity:", error);
    throw error;
  }
}

// Appointment/Calendar Management
export async function createGhlAppointment(appointmentData: {
  calendarId: string;
  locationId: string;
  contactId: string;
  startTime: string;
  endTime: string;
  title: string;
  appointmentStatus?: string;
}) {
  try {
    console.log("📅 Creating GHL appointment:", appointmentData);

    const response = await fetch(`${GHL_API_V2_BASE}/calendars/events`, {
      method: "POST",
      headers: getGhlHeaders(appointmentData.locationId),
      body: JSON.stringify({
        calendarId: appointmentData.calendarId,
        locationId: appointmentData.locationId,
        contactId: appointmentData.contactId,
        startTime: appointmentData.startTime,
        endTime: appointmentData.endTime,
        title: appointmentData.title,
        appointmentStatus: appointmentData.appointmentStatus || "confirmed",
        notes: "Scheduled via SaintVisionAI AI Assistant",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ GHL appointment created:", result);
    return result;
  } catch (error) {
    console.error("❌ Error creating GHL appointment:", error);
    throw error;
  }
}

// Get user's appointments
export async function getGhlAppointments(
  locationId: string,
  startDate?: string,
  endDate?: string,
) {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response = await fetch(
      `${GHL_API_V2_BASE}/calendars/events?${params.toString()}`,
      {
        method: "GET",
        headers: getGhlHeaders(locationId),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error fetching GHL appointments:", error);
    throw error;
  }
}

// Sub-account Management
export async function createGhlLocation(locationData: {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  timezone?: string;
}) {
  try {
    console.log("🏢 Creating GHL sub-account:", locationData);

    const response = await fetch(`${GHL_API_V2_BASE}/locations/`, {
      method: "POST",
      headers: getGhlHeaders(),
      body: JSON.stringify({
        name: locationData.name,
        address: locationData.address || "",
        city: locationData.city || "",
        state: locationData.state || "",
        country: locationData.country || "US",
        postalCode: locationData.postalCode || "",
        website: locationData.website || "",
        timezone: locationData.timezone || "America/New_York",
        settings: {
          allowDuplicateContact: false,
          allowDuplicateOpportunity: false,
          allowFacebookNameMerge: true,
          disableContactTimezone: false,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ GHL sub-account created:", result);
    return result;
  } catch (error) {
    console.error("❌ Error creating GHL sub-account:", error);
    throw error;
  }
}

// Note/Activity logging
export async function addGhlNote(noteData: {
  contactId: string;
  locationId: string;
  body: string;
  userId?: string;
}) {
  try {
    console.log("📝 Adding GHL note:", noteData);

    const response = await fetch(
      `${GHL_API_V2_BASE}/contacts/${noteData.contactId}/notes`,
      {
        method: "POST",
        headers: getGhlHeaders(noteData.locationId),
        body: JSON.stringify({
          body: `${noteData.body}\n\n---\nAdded via SaintVisionAI AI Assistant`,
          userId: noteData.userId,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ GHL note added:", result);
    return result;
  } catch (error) {
    console.error("❌ Error adding GHL note:", error);
    throw error;
  }
}

// AI Function Calling Integration
// These functions are designed to be called by the AI assistant
export const ghlAIFunctions = {
  createContact: createGhlContact,
  updateContact: updateGhlContact,
  getContact: getGhlContact,
  createOpportunity: createGhlOpportunity,
  createAppointment: createGhlAppointment,
  getAppointments: getGhlAppointments,
  addNote: addGhlNote,
};

// Helper to get user's GHL location ID from database
export async function getUserGhlLocationId(
  userId: string,
): Promise<string | null> {
  // This would query your database to get the user's mapped GHL location ID
  // Implementation depends on your database schema
  try {
    // Example implementation (adjust based on your actual database)
    const { createClient } = await import("@supabase/supabase-js");
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Missing Supabase environment variables for GHL API");
      return { leadSources: [], opportunityStages: [] };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data } = await supabase
      .from("workspaces")
      .select("ghl_location_id")
      .eq("user_id", userId)
      .single();

    return data?.ghl_location_id || null;
  } catch (error) {
    console.error("Error fetching user GHL location:", error);
    return null;
  }
}

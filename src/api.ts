const BASE_URL = "https://health.data.ny.gov/resource/tbxv-5tbd.json";

export interface InspectionSummary {
  operation_name: string;
  nys_health_operation_id: string;
  facility_address: string;
  city: string;
  date: string;
  total_critical_violations?: string;
}

export interface InspectionDetail {
  operation_name: string;
  nys_health_operation_id: string;
  facility_address: string;
  city: string;
  food_service_facility_state: string;
  zip_code: string;
  date: string;
  total_critical_violations: string;
  total_crit_not_corrected: string;
  violations: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export function searchByName(name: string): Promise<InspectionSummary[]> {
  const sanitized = name.replace(/'/g, "''");
  const params = new URLSearchParams({
    county: "ONONDAGA",
    $select: "operation_name,nys_health_operation_id,facility_address,city,date",
    $where: `contains(operation_name,'${sanitized}')`,
    $limit: "100",
  });
  return fetchJson(`${BASE_URL}?${params}`);
}

export function fetchLatest(): Promise<InspectionSummary[]> {
  const params = new URLSearchParams({
    county: "ONONDAGA",
    $select: "operation_name,nys_health_operation_id,facility_address,city,date",
    $order: "date DESC",
    $limit: "100",
  });
  return fetchJson(`${BASE_URL}?${params}`);
}

export function fetchWorst(): Promise<InspectionSummary[]> {
  const params = new URLSearchParams({
    county: "ONONDAGA",
    $select: "operation_name,nys_health_operation_id,facility_address,city,date,total_critical_violations",
    $where: "total_critical_violations>0",
    $order: "total_critical_violations DESC",
    $limit: "100",
  });
  return fetchJson(`${BASE_URL}?${params}`);
}

export function fetchDetail(id: string): Promise<InspectionDetail[]> {
  const params = new URLSearchParams({
    nys_health_operation_id: id,
  });
  return fetchJson(`${BASE_URL}?${params}`);
}

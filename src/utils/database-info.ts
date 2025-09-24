import { supabase } from '@/integrations/supabase/client'

export async function listTables() {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    if (error) {
      console.error('Error fetching tables:', error)
      return []
    }

    return data
  } catch (err) {
    console.error('Exception fetching tables:', err)
    return []
  }
}

export async function getTableInfo(tableName: string) {
  try {
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_schema', 'public')
      .eq('table_name', tableName)

    if (error) {
      console.error(`Error fetching info for table ${tableName}:`, error)
      return null
    }

    return data
  } catch (err) {
    console.error(`Exception fetching info for table ${tableName}:`, err)
    return null
  }
}
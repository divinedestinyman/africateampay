import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const S = StyleSheet.create({
  page:        { backgroundColor: '#FAFAFA', padding: 48, fontFamily: 'Helvetica' },
  title:       { fontSize: 26, fontWeight: 700, color: '#0A0A0A', marginBottom: 4 },
  subtitle:    { fontSize: 10, color: '#888', letterSpacing: 2, marginBottom: 24 },
  divider:     { borderBottom: '1px solid #E0E0E0', marginBottom: 24 },
  badge:       { fontSize: 10, color: '#6B4D00', backgroundColor: '#FFF8E1', padding: '4 10', borderRadius: 4, alignSelf: 'flex-start', marginBottom: 20 },
  refBox:      { backgroundColor: '#0A0A0A', padding: 16, borderRadius: 6, marginBottom: 28 },
  refLabel:    { fontSize: 9, color: '#888', letterSpacing: 1.5, marginBottom: 6 },
  refText:     { fontSize: 14, color: '#D4A017', fontFamily: 'Courier', letterSpacing: 1 },
  section:     { marginBottom: 20 },
  secTitle:    { fontSize: 9, color: '#888', letterSpacing: 1.5, marginBottom: 10 },
  row:         { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label:       { fontSize: 11, color: '#555' },
  value:       { fontSize: 11, color: '#0A0A0A', fontWeight: 700 },
  mono:        { fontFamily: 'Courier', fontSize: 9 },
  footer:      { marginTop: 48, borderTop: '1px solid #E0E0E0', paddingTop: 16 },
  footerText:  { fontSize: 9, color: '#999', textAlign: 'center', marginBottom: 4 },
});

export default function ReceiptDocument({ order }) {
  const amountSent = order.direction === 'inbound'
    ? `${order.sender_currency || 'USD'} ${Number(order.sender_amount || 0).toFixed(2)}`
    : `UGX ${Number(order.amount_ugx || 0).toLocaleString()}`;

  const amountReceived = order.direction === 'inbound'
    ? `UGX ${Number(order.recipient_amount_ugx || 0).toLocaleString()}`
    : `USDT ${Number(order.usdt_amount || 0).toFixed(2)}`;

  const statusLabel = (order.status || 'completed').toUpperCase().replace(/_/g, ' ');

  return (
    <Document title={`Receipt — ${order.reference}`} author="AfricaTeamPay">
      <Page size="A4" style={S.page}>
        <Text style={S.title}>AfricaTeamPay</Text>
        <Text style={S.subtitle}>TRANSFER RECEIPT</Text>
        <View style={S.divider} />

        <Text style={S.badge}>✓ {statusLabel}</Text>

        <View style={S.refBox}>
          <Text style={S.refLabel}>REFERENCE NUMBER</Text>
          <Text style={S.refText}>{order.reference}</Text>
        </View>

        <View style={S.section}>
          <Text style={S.secTitle}>TRANSFER DETAILS</Text>
          <View style={S.row}>
            <Text style={S.label}>Direction</Text>
            <Text style={S.value}>{order.direction === 'inbound' ? 'Inbound (diaspora → Uganda)' : 'Outbound (Uganda → supplier)'}</Text>
          </View>
          <View style={S.row}>
            <Text style={S.label}>Amount Sent</Text>
            <Text style={S.value}>{amountSent}</Text>
          </View>
          <View style={S.row}>
            <Text style={S.label}>Amount Received</Text>
            <Text style={S.value}>{amountReceived}</Text>
          </View>
          {order.usdt_rate && (
            <View style={S.row}>
              <Text style={S.label}>Rate (1 USDT)</Text>
              <Text style={S.value}>UGX {Number(order.usdt_rate).toLocaleString()}</Text>
            </View>
          )}
          <View style={S.row}>
            <Text style={S.label}>Service Fee</Text>
            <Text style={S.value}>1% flat</Text>
          </View>
          {order.corridor_id && (
            <View style={S.row}>
              <Text style={S.label}>Corridor</Text>
              <Text style={S.value}>{order.corridor_id.toUpperCase()}</Text>
            </View>
          )}
        </View>

        {order.blockchain_tx_hash && (
          <View style={S.section}>
            <Text style={S.secTitle}>BLOCKCHAIN</Text>
            <View style={S.row}>
              <Text style={S.label}>Network</Text>
              <Text style={S.value}>{(order.chain || 'TRC20').toUpperCase()}</Text>
            </View>
            <View style={S.row}>
              <Text style={S.label}>TX Hash</Text>
              <Text style={[S.value, S.mono]}>{order.blockchain_tx_hash}</Text>
            </View>
          </View>
        )}

        <View style={S.section}>
          <Text style={S.secTitle}>TIMESTAMPS</Text>
          <View style={S.row}>
            <Text style={S.label}>Created</Text>
            <Text style={S.value}>{order.created_at ? new Date(order.created_at).toUTCString() : '—'}</Text>
          </View>
          {order.updated_at && (
            <View style={S.row}>
              <Text style={S.label}>Last Updated</Text>
              <Text style={S.value}>{new Date(order.updated_at).toUTCString()}</Text>
            </View>
          )}
        </View>

        <View style={S.footer}>
          <Text style={S.footerText}>AfricaTeamPay — Uganda USDT Corridor Network — africateampay.vercel.app</Text>
          <Text style={S.footerText}>Flat 1% fee. 80% cheaper than your bank. Powered by USDT rails.</Text>
        </View>
      </Page>
    </Document>
  );
}

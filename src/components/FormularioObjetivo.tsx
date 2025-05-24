// src/components/FormularioObjetivo.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useApi } from '../hooks/useApi'
import { useNavigation } from '@react-navigation/native';;

const FormularioObjetivo = ({ onSucesso }: { onSucesso?: () => void }) => {
  const { salvarObjetivo, gerarPercentuais, gerarAtivos } = useApi();
  const navigation = useNavigation();
  const [objetivo, setObjetivo] = useState('Aposentadoria');
  const [prazo, setPrazo] = useState('1');
  const [valorInicial, setValorInicial] = useState('');
  const [aporteMensal, setAporteMensal] = useState('');
  const [patrimonioAtual, setPatrimonioAtual] = useState('');
  const [liquidez, setLiquidez] = useState('Alta');

  const [cripto, setCripto] = useState(false);
  const [lci, setLci] = useState(false);
  const [fundos, setFundos] = useState(false);

  const handleSubmit = async () => {
    const setoresEvitar = [];
    if (cripto) setoresEvitar.push('Criptomoedas');
    if (lci) setoresEvitar.push('LCI / LCA');
    if (fundos) setoresEvitar.push('Fundos de Investimentos');
  
    try {
      // 1. Salva objetivo
      await salvarObjetivo({
        objetivo,
        prazo: parseInt(prazo, 10),
        valorInicial: parseFloat(valorInicial),
        aporteMensal: parseFloat(aporteMensal),
        patrimonioAtual: parseFloat(patrimonioAtual),
        liquidez,
        setoresEvitar,
      });
  
      const percentuais = await gerarPercentuais();
      const ativos = await gerarAtivos();

      navigation.navigate('SimulacaoCarteira', {
        percentuais: percentuais.data,
        ativos: ativos.data
      });

    } catch (err) {
      console.error('Erro ao gerar carteira:', err);
    }
  };
  

  const renderCheckbox = (label: string, checked: boolean, toggle: () => void) => (
    <TouchableOpacity style={styles.checkboxRow} onPress={toggle}>
      <View style={[styles.checkboxBox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkboxX}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.form}>
        <Text style={styles.label}>Objetivo</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={objetivo} onValueChange={setObjetivo} style={styles.picker}>
            <Picker.Item label="Aposentadoria" value="Aposentadoria" />
            <Picker.Item label="Compra de Imóvel" value="Imóvel" />
            <Picker.Item label="Reserva de emergência" value="Reserva" />
          </Picker>
        </View>

        <Text style={styles.label}>Prazo</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={prazo} onValueChange={setPrazo} style={styles.picker}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="15" value="15" />
          </Picker>
        </View>

        <TextInput placeholder="Valor Inicial" value={valorInicial} onChangeText={setValorInicial} style={styles.input} keyboardType="numeric" />
        <TextInput placeholder="Aporte Mensal" value={aporteMensal} onChangeText={setAporteMensal} style={styles.input} keyboardType="numeric" />
        <TextInput placeholder="Patrimônio Atual" value={patrimonioAtual} onChangeText={setPatrimonioAtual} style={styles.input} keyboardType="numeric" />

        <Text style={styles.label}>Tipo de Liquidez</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={liquidez} onValueChange={setLiquidez} style={styles.picker}>
            <Picker.Item label="Alta" value="Alta" />
            <Picker.Item label="Média" value="Média" />
            <Picker.Item label="Baixa" value="Baixa" />
          </Picker>
        </View>

        <Text style={styles.label}>Deseja evitar algum setor?</Text>
        <View style={styles.checkboxContainer}>
          {renderCheckbox('Criptomoedas', cripto, () => setCripto(!cripto))}
          {renderCheckbox('LCI / LCA', lci, () => setLci(!lci))}
          {renderCheckbox('Fundos de Investimentos', fundos, () => setFundos(!fundos))}
        </View>

        <Button title="Fazer Simulação" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 32 },
  form: { padding: 16, backgroundColor: '#1e1e1e', borderRadius: 8 },
  input: { marginBottom: 10, backgroundColor: '#2c2c2c', padding: 15, color: '#fff', borderRadius: 6 },
  pickerWrapper: { backgroundColor: '#2c2c2c', marginBottom: 10, borderRadius: 6 },
  picker: { color: '#fff'},
  label: { color: '#fff', marginBottom: 4 },
  checkboxContainer: { marginBottom: 16 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkboxLabel: { color: '#fff', marginLeft: 8 },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#00ff99',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#00ff99',
  },
  checkboxX: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default FormularioObjetivo;

import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
});

const ReportView = ({ finalPredictionData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>DiverseMind - Writing Test Report</Text>
          <Text>Professional Summary of Student's Scores</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Final Prediction</Text>
          <Text>Skill Level: {finalPredictionData.skill_level}</Text>
          <Text>
            Letter Formation Score: {finalPredictionData.letter_formation_score}
          </Text>
          <Text>
            Vowel Symbol Score: {finalPredictionData.vowel_symbol_score}
          </Text>
          <Text>
            Punctuation Score: {finalPredictionData.punctuation_score}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReportView;

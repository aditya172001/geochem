import { Image, Page, Text, View } from "@react-pdf/renderer";
import {
  CustomTestType,
  GetAllSamplesForReportType,
} from "./orders/get-report/actions";

const formatDate = (date: Date | null | undefined): string => {
  return date?.toISOString().split("T")[0] || "";
};

function calculateResult(
  quantity: number | null,
  minLimit: number | null,
  maxLimit: number | null
): "Passed" | "Failed" | null {
  if (quantity == null || minLimit == null || maxLimit == null) return null;
  if (minLimit <= quantity && quantity <= maxLimit) return "Passed";
  return "Failed";
}

export const PageOfReport = ({
  pageNo,
  totalPages,
  sample,
  tests,
}: {
  pageNo: number;
  totalPages: number;
  sample: GetAllSamplesForReportType;
  tests: CustomTestType[];
}) => (
  <Page size="A4" style={{}}>
    {/* left border */}
    <View
      key={1}
      style={{
        display: "flex",
        flexDirection: "row",
        fontSize: 8,
        transform: "rotate(-90deg)", // Rotate each text item
        position: "absolute",
        top: 400,
        left: -360,
      }}
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <Text key={index} style={{ paddingRight: 6 }}>
          GEO-CHEM
        </Text>
      ))}
    </View>
    {/* right border */}
    <View
      key={2}
      style={{
        display: "flex",
        flexDirection: "row",
        fontSize: 8,
        transform: "rotate(-90deg)", // Rotate each text item
        position: "absolute",
        top: 400,
        left: 205,
      }}
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <Text key={index} style={{ paddingRight: 6 }}>
          GEO-CHEM
        </Text>
      ))}
    </View>
    {/* top border */}
    <View
      key={3}
      style={{
        display: "flex",
        flexDirection: "row",
        fontSize: 8,
        position: "absolute",
        top: 20,
        left: 50,
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Text key={index} style={{ paddingRight: 6 }}>
          GEO-CHEM
        </Text>
      ))}
    </View>
    {/* bottom border */}
    <View
      key={4}
      style={{
        display: "flex",
        flexDirection: "row",
        fontSize: 8,
        position: "absolute",
        bottom: 50,
        left: 50,
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Text key={index} style={{ paddingRight: 6 }}>
          GEO-CHEM
        </Text>
      ))}
    </View>
    {/* top left icon */}
    <View
      key={5}
      style={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        left: 12,
        top: 18,
      }}
    >
      <Image src="/square-with-circle.png" style={{ width: 13 }} />
      <Image src="/square-with-circle.png" style={{ width: 13 }} />
    </View>
    {/* top right icon */}
    <View
      key={6}
      style={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        right: 12,
        top: 18,
      }}
    >
      <Image src="/square-with-circle.png" style={{ width: 13 }} />
      <Image src="/square-with-circle.png" style={{ width: 13 }} />
    </View>
    {/* bottom left icon */}
    <View
      key={7}
      style={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        left: 12,
        bottom: 46,
      }}
    >
      <Image src="/square-with-circle.png" style={{ width: 13 }} />
      <Image src="/square-with-circle.png" style={{ width: 13 }} />
    </View>
    {/* bottom right icon */}
    <View
      key={8}
      style={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        right: 12,
        bottom: 46,
      }}
    >
      <Image src="/square-with-circle.png" style={{ width: 13 }} />
      <Image src="/square-with-circle.png" style={{ width: 13 }} />
    </View>
    {/* Header */}
    <View id="non-absolute" style={{ paddingHorizontal: 35, paddingTop: 35 }}>
      <View style={{}} id="header">
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ flex: 1, textAlign: "center" }}>GEO CHEM</Text>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ alignItems: "flex-end", paddingBottom: 8 }}>
              <Image src="geochem-cotecna-logo.jpg" style={{ width: 100 }} />
            </View>
            <Text style={{ textDecoration: "underline", fontSize: 11 }}>
              TEST REPORT
            </Text>
          </View>
          <Text style={{ flex: 1, textAlign: "center" }}>geochem address</Text>
        </View>
        <View
          style={{
            fontSize: 9,
            alignItems: "center",
            borderBottom: "1px solid black",
            marginTop: 6,
          }}
        >
          <Text style={{}}>FORM 39</Text>
          <Text style={{}}>
            (See Rule 150 - E (f) The Drugs and Cosmetics Act 1940 & the rules
            thereunder)
          </Text>
          <Text style={{}}>
            Report of Test or Analysis by Approved Institution
          </Text>
        </View>
      </View>

      <View id="report-detail" style={{ fontSize: 9 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderBottom: "1px solid black",
          }}
        >
          <Text>Certificate No: {sample?.report?.certificateNumber || ""}</Text>
          <Text>APPROVAL NO. {sample?.report?.approvalNumber || ""}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderBottom: "1px solid black",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: 1,
            }}
          >
            <Text style={{}}>Party&apos;s Name & Address:</Text>
            <Text style={{ marginLeft: 4, width: 250 }}>
              {sample.package.branch.party.name}, {sample.package.branch.name},{" "}
              {sample.package.branch.address}
            </Text>
          </View>
          <Text
            style={{
              border: "1px solid black",
              padding: 1,
            }}
          >
            SAMPLE {sample.drawnByGeoChem ? "" : "NOT "}DRAWN BY GEO-CHEM
          </Text>
        </View>
        <View
          id="1"
          style={{
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderBottom: "1px solid black",
          }}
        >
          <Text>
            1. Name of manufacturer from whom sample received together with his
            manufacturing licence No. under the act & under the rule made
            thereunder
          </Text>
        </View>
        <View
          id="2,3"
          style={{
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 4,
            borderBottom: "1px solid black",
          }}
        >
          <Text
            style={{
              width: 600,
              paddingVertical: 2,
              paddingRight: 2,
            }}
          >
            {sample.mfgName}
          </Text>
          <Text
            style={{
              width: 300,
              paddingVertical: 2,
              paddingHorizontal: 2,
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            }}
          >
            2. Mfg Lic No. {sample.mfgLicenceNumber}
          </Text>
          <Text
            style={{
              width: 300,
              paddingVertical: 2,
              paddingLeft: 2,
            }}
          >
            3. Date of receipt: {formatDate(sample.package.collectionDate)}
          </Text>
        </View>
        <View
          id="4"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderBottom: "1px solid black",
          }}
        >
          <Text style={{ width: 600, paddingRight: 10 }}>
            4. Reference No. & date of the letter from the manufacturer/party
            under which the sample was forwarded
          </Text>
          <Text style={{ width: 300, paddingRight: 10 }}>
            update sample ref no
          </Text>
          <Text style={{ width: 300 }}>
            {formatDate(sample.package.shippingDate)}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderBottom: "1px solid black",
          }}
        >
          <Text style={{ width: 285 }}>
            Shipping Bill No. & {sample?.report?.shippingBillNumber}
          </Text>
          <Text style={{ width: 285 }}>
            CHA No.: {sample?.report?.chaNumber}
          </Text>
        </View>
        <View
          id="5"
          style={{
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderBottom: "1px solid black",
          }}
        >
          <Text>5. Analysis applied for: AS BELOW</Text>
        </View>
        <View
          id="6"
          style={{
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderBottom: "1px solid black",
          }}
        >
          <Text>
            6. Name of the raw material purporting to be contained in the
            sample: {sample.masterSample.name}
          </Text>
        </View>
        <View
          id="7"
          style={{
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderBottom: "1px solid black",
          }}
        >
          <Text>
            7. Details of the Raw Material / final products in bulk final
            products (in finished pack) as obtained from the Manufacturer /
            party.
          </Text>
        </View>
        <View
          id="7a,b,c,d,e"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 4,
            borderBottom: "1px solid black",
          }}
        >
          <View
            id="7a"
            style={{
              width: 250,
              paddingVertical: 2,
              paddingRight: 2,
              borderRight: "1px solid black",
            }}
          >
            <Text>
              (a) Original Manufacturer&apos;s name (in the case of repacked)
            </Text>
            <Text style={{ marginLeft: 10 }}> {sample.mfgName}</Text>
          </View>
          <View
            id="7b"
            style={{
              width: 80,
              paddingVertical: 2,
              paddingHorizontal: 2,
              borderRight: "1px solid black",
            }}
          >
            <Text>(b) Batch No.</Text>
            <Text style={{ marginLeft: 10 }}> {sample.batchNumber}</Text>
          </View>
          <View
            id="7c"
            style={{
              width: 80,
              paddingVertical: 2,
              paddingHorizontal: 2,
              borderRight: "1px solid black",
            }}
          >
            <Text>(c) Batch Size</Text>
            <Text style={{ marginLeft: 10 }}>
              {" "}
              {sample.batchSizeQuantity} {sample.batchSizeUnit}
            </Text>
          </View>
          <View
            id="7d"
            style={{
              width: 80,
              paddingVertical: 2,
              paddingHorizontal: 2,
              borderRight: "1px solid black",
            }}
          >
            <Text>(d) Mfg. Date</Text>
            <Text style={{ marginLeft: 10 }}>
              {" "}
              {formatDate(sample.mfgDate)}
            </Text>
          </View>
          <View
            id="7e"
            style={{
              width: 80,
              paddingVertical: 2,
              paddingLeft: 2,
            }}
          >
            <Text>(e) Exp. Date</Text>
            <Text style={{ marginLeft: 10 }}>
              {" "}
              {formatDate(sample.expDate)}
            </Text>
          </View>
        </View>
        <View
          id="8"
          style={{
            display: "flex",
            flexDirection: "row",
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderBottom: "1px solid black",
          }}
        >
          <Text style={{ width: 285 }}>
            8. Quantity of sample received: {sample.quantity} {sample.unit}
          </Text>
          <Text style={{ width: 285 }}>
            T.R. No. {sample?.report?.trNumber}
          </Text>
        </View>
        <View
          id="9"
          style={{
            paddingVertical: 2,
            paddingHorizontal: 4,
          }}
        >
          <Text>
            9. Result of test or analysis with protocols of test or analysis
            applied
          </Text>
          <View id="9data" style={{ marginLeft: 9 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 2,
              }}
            >
              <Text style={{ width: 285 }}>
                ANALYSIS START DATE:{" "}
                {formatDate(sample?.report?.analysisStartDate)}
              </Text>
              <Text style={{ width: 285 }}>
                ANALYSIS END DATE: {formatDate(sample?.report?.analysisEndDate)}
              </Text>
            </View>
            <Text style={{ paddingVertical: 2 }}>
              A.R. NO.: {sample?.report?.arNumber}
            </Text>
            <View
              id="tests-data-header"
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 2,
              }}
            >
              <Text style={{ width: 190 }}>SR. TEST PARAMETER/METHOD</Text>
              <Text style={{ width: 190 }}>RESULT WITH UNIT</Text>
              <Text style={{ width: 190 }}>SPECIFICATION WITH LIMIT</Text>
            </View>
            <View
              id="specification"
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 2,
              }}
            >
              <Text style={{ width: 190 }}>
                {sample.masterSpecification?.name}
              </Text>
              <Text style={{ width: 190 }} />
              <Text style={{ width: 190 }}>
                {sample.masterSpecification?.name}
              </Text>
            </View>
            <View style={{ borderBottom: "1px dashed black" }} />
            <View id="tests-data" style={{ height: 235 }}>
              {tests.map((t, index) => (
                <View
                  key={index}
                  id="specification"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingVertical: 2,
                  }}
                >
                  <Text style={{ width: 190 }}>
                    {index + 1}. {t.masterTest.name}
                  </Text>
                  <Text style={{ width: 190 }}>
                    {" "}
                    {calculateResult(
                      t.resultQuantity,
                      t.minQuantity,
                      t.maxQuantity
                    )}
                  </Text>
                  <Text style={{ width: 190 }}> {t.description}</Text>
                </View>
              ))}
            </View>
            <View style={{ borderBottom: "1px dashed black" }} />
            <Text style={{ textAlign: "right", paddingVertical: 2 }}>
              {pageNo} of {totalPages}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ width: 400, paddingVertical: 2 }}>
            OPINION: In the opinion of the undersigned, the sample referred to
            above is{" "}
            <Text style={{ fontWeight: "bold" }}>OF STANDARD QUALITY</Text> as
            defined in the Act and rules made thereunder for the reason given
            below
          </Text>
          <Text style={{ paddingVertical: 2 }}>
            The sample <Text style={{ fontWeight: "bold" }}>COMPLIES</Text>{" "}
            Specification w.r.to above test
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 30,
            }}
          >
            <Text style={{ width: 285 }}>Date: {formatDate(new Date())}</Text>
            <Text style={{ width: 285 }}>
              (Signature of Person-in-Charge of testing)
            </Text>
          </View>
        </View>
      </View>

      <View id="footer" style={{ fontSize: 9 }}>
        <Text>1. Test Results related to the sample (s) tested.</Text>
        <Text>
          2. Test certificate in full or part shall not be reproduced unless
          written permission is obtained from : XXXX
        </Text>
        <Text>3. Not included in scope of accreditation</Text>
        <Text>
          4. Samples will be retained by us for a period of thirty days only,
          unless specific instructions to the contrary are received.
        </Text>
      </View>
      {/* contact footer */}
      <View
        id="footer-contact"
        style={{ alignItems: "center", fontSize: 9, paddingTop: 13 }}
      >
        <Text>geochem address</Text>
        <Text>geochem contact</Text>
        <Text>other details</Text>
      </View>
    </View>
  </Page>
);

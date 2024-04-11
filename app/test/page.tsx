"use client"

import React, { useState, useMemo } from "react";
import { Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useAppStore } from "../AppStore";
import CreateTx  from "@/components/CreateTx";
import { TransactionRow } from "@/components/TransactionRow";

export default function TxPageTest() {
  const { txs, accounts } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };
  
  const onCloseModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  const assetsToSelectFrom = useMemo(() => {
    const assetsList = accounts.map((account) => {
      return Object.entries(account).map(([_, assetInfo]) => {
        const { id, name, iconUrl } = assetInfo.asset;
        return { id, name, iconUrl, balance: assetInfo.balance?.total ?? "" };
      });
    });

    return assetsList[0];
  }, [accounts]);

  return (
    <>
      <Card className="max-w-[1000px] min-w-[400px] p-3">
        <CardHeader className="flex justify-center">
          <p className="text-lg">Transactions</p>
        </CardHeader>
        <CardBody>
        <div className="overflow-x-auto">
        <table className="table table-fixed">
          <thead>
            <tr>
              <th>TxId</th>
              <th>Last updated</th>
              <th>Asset</th>
              <th>Operation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {txs.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </tbody>
        </table>
      </div>
          <Button onClick={onOpenModal}>
            Create Transaction
          </Button>
          {assetsToSelectFrom && (
              <CreateTx
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                assetsToSelectFrom={assetsToSelectFrom} 
              />
          )}
        </CardBody>
      </Card>
    </>
  );
}
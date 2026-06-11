// RolesPermissionsMatrix.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { CheckBox, NoRecordFound } from '../../../assets/svg';
import { FontSizes, Spacing } from '../../../helpers/sizeHelper';
import { PopinsFont } from '../../../helpers/Fonts';

const RolesPermissionsMatrix = ({
  allResources,
  visibleResources,
  permissionMatrix,
  onChange,
  loading,
}) => {
  const [permissions, setPermissions] = useState(() => {
    const initial = {};
    allResources.forEach(res => {
      const existing = permissionMatrix.find(p => p.resource === res.value);
      initial[res.value] = {
        create: existing?.canCreate || false,
        read: existing?.canRead || false,
        update: existing?.canUpdate || false,
        delete: existing?.canDelete || false,
      };
    });
    return initial;
  });

  // Sync internal state when the external permissionMatrix changes (e.g., role switch)
  useEffect(() => {
    const newPerms = {};
    allResources.forEach(res => {
      const existing = permissionMatrix.find(p => p.resource === res.value);
      newPerms[res.value] = {
        create: existing?.canCreate || false,
        read: existing?.canRead || false,
        update: existing?.canUpdate || false,
        delete: existing?.canDelete || false,
      };
    });
    setPermissions(newPerms);
  }, [allResources, permissionMatrix]);

  const togglePermission = useCallback(
    (resourceValue, key) => {
      setPermissions(prev => {
        const updated = {
          ...prev,
          [resourceValue]: {
            ...prev[resourceValue],
            [key]: !prev[resourceValue][key],
          },
        };
        // Generate the FULL matrix (all resources) from the updated state
        const fullMatrix = Object.entries(updated).map(([resource, perms]) => ({
          resource,
          canCreate: perms.create,
          canRead: perms.read,
          canUpdate: perms.update,
          canDelete: perms.delete,
        }));
        onChange?.(fullMatrix);
        return updated;
      });
    },
    [onChange],
  );

  const renderPermissionCell = useCallback(
    (resourceValue, key) => {
      const enabled = permissions[resourceValue]?.[key] || false;
      return (
        <TouchableOpacity
          style={styles.cellTouchable}
          onPress={() => togglePermission(resourceValue, key)}
        >
          <View style={styles.cellContent}>
            <CheckBox
              fill={enabled ? '#009FD9' : '#C3C3C3'}
              style={{
                height: 25,
                width: 25,
                marginLeft: key === 'update' || key === 'delete' ? 10 : 5,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [permissions, togglePermission],
  );

  const renderRow = ({ item }) => {
    const resourceValue = item.value;
    return (
      <View style={styles.tableRow}>
        <View style={[styles.cell]}>
          <Text style={styles.resourceLabel}>{item.label}</Text>
        </View>
        <View style={styles.cell}>
          {renderPermissionCell(resourceValue, 'create')}
        </View>
        <View style={styles.cell}>
          {renderPermissionCell(resourceValue, 'read')}
        </View>
        <View style={styles.cell}>
          {renderPermissionCell(resourceValue, 'update')}
        </View>
        <View style={styles.cell}>
          {renderPermissionCell(resourceValue, 'delete')}
        </View>
      </View>
    );
  };

  // Conditional rendering AFTER all hooks – now allowed
  if (!visibleResources || visibleResources.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <NoRecordFound style={{ height: 100, width: 100 }} />
        <Text style={styles.emptyText}>No resources selected.</Text>
        <Text style={styles.emptySubText}>
          Please select at least one resource from the tabs above.
        </Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'small'} color={'#2A2A2A'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <View style={[styles.cell]}>
          <Text style={[styles.headerText, { marginLeft: 5 }]}>CRUD</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headerText}>Create</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headerText}>Read</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headerText}>Update</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.headerText}>Delete</Text>
        </View>
      </View>
      <FlatList
        data={visibleResources}
        keyExtractor={item => item.value}
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 8,
    width: '95%',
    alignSelf: 'center',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: Spacing.l,
  },
  tableHeader: {
    flexDirection: 'row',
    marginVertical: 12,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: Spacing.s,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  resourceLabel: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#151515',
    lineHeight: Spacing.l,
  },
  headerText: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
    lineHeight: Spacing.l,
  },
  cellTouchable: { width: '100%', alignSelf: 'flex-start' },
  cellContent: {
    alignItems: 'flex-start',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
    marginVertical: 8,
  },
  emptySubText: {
    fontSize: 12,
    color: '#2A2A2A',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: PopinsFont.regular,
  },
  loading: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 8,
    width: '95%',
    alignSelf: 'center',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: Spacing.l,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RolesPermissionsMatrix;
